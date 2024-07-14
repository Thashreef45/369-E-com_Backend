import { Request, Response } from "express"

// publisher
import * as notificationPublisher from './communication/publisher/notification-publisher'
import * as productPublisher from "./communication/publisher/B2C-product-publisher"



//dependencies
import Repository from "../../infrastructure/repository/repository"

import { createTempToken , createToken } from "../../infrastructure/services/generateToken"
import generateOtp from "../../infrastructure/services/generate-otp"


// usecase 
import Register from "../usecase/e-com/register"
import VerifyOtp from "../usecase/e-com/verify-otp"
import CreateProduct from "../usecase/e-com/add-product"


//repository instance
const repository = new Repository()



// registration
export const register = async (req : Request , res:Response) => {

    const dependencies = {
        repository: repository,
        createTempToken,
        generateOtp,
        sendOtpToEmail : notificationPublisher.sendOtpToEmail
    }

    const data = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        about : req.body.about,
        password : req.body.password
    }

    const interactor = new Register(dependencies)

    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


//validate vendor otp

export const validateOtp = async (req:Request , res:Response) => {
    const dependencies = {
        repository ,
        createToken,
    }
    const data = {
        ... req.body
    }

    const interactor = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)

}

export const addproduct = async (req : Request , res:Response) => {
    const dependencies = {
        repository,
        createProduct : productPublisher.createProduct
    }

    // todo : ----
    const data = {...req.body}

    const interactor  = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}