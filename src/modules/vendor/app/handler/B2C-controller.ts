import { Request, Response } from "express"

// publisher
import * as notificationPublisher from './communication/publisher/notification-publisher'
import * as productPublisher from "./communication/publisher/B2C-product-publisher"



//dependencies
import Repository from "../../infrastructure/repository/repository"

import { createTempToken, createToken } from "../../infrastructure/services/generateToken"
import generateOtp from "../../infrastructure/services/generate-otp"
import hashPassword from "../../infrastructure/services/hash-password"
import verifyHash from "../../infrastructure/services/verify-hash"


// usecase 
import Register from "../usecase/B2C/register"
import VerifyOtp from "../usecase/B2C/verify-otp"
import CreateProduct from "../usecase/B2C/add-product"
import Login from "../usecase/B2C/login"
import GetProduct from "../usecase/B2C/fetch-a-product"
import UpdateProduct from "../usecase/B2C/update-product"
import ResendOtp from "../usecase/B2C/resend-otp"




//repository instance
const repository = new Repository()



// registration
export const register = async (req: Request, res: Response) => {

    const dependencies = {
        repository: repository,
        createTempToken,
        hashPassword: hashPassword,
        generateOtp,
        sendOtpToEmail: notificationPublisher.sendOtpToEmail,
    }

    const data = {
        name: req.body?.name,
        phone: req.body?.phone,
        email: req.body?.email,
        about: req.body?.about,
        password: req.body?.password
    }

    const interactor = new Register(dependencies)

    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



//validate vendor otp
export const validateOtp = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        createToken,
    }
    const data = {
        ...req.body
    }

    const interactor = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)

}


//Resend OTP
export const resendOtp = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        generateOtp,
        sendOtp : notificationPublisher.sendOtpToEmail
        // createToken,
    }
    const data = {
        email : req.body?.email
    }

    const interactor = new ResendOtp(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)

}



export const login = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        createToken,
        verifyPassword: verifyHash
    }
    const data = {
        ...req.body
    }

    const interactor = new Login(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}



//create a product
export const addproduct = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        createProduct: productPublisher.createProduct
    }

    const data = { ...req.body } // --- 

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



// fetch a product
export const getProduct = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        getProduct: productPublisher.getProduct  // fetch single product with productId
    }

    const data = {
        productId: req.params.productId
    }

    const interactor = new GetProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}

// Edit a product
export const updateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        updateProduct: productPublisher.updateProduct
    }

    const data = { ...req.body } // --- 

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}