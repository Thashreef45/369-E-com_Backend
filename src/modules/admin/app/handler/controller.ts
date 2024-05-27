//packages
import { Request,Response } from "express"

//event publishers
import * as productPublisher from '../handler/communication/publisher/product-publisher'

//dependencies
import AdminRepository from "../../infrastructure/repository/admin-repository"
//services
import createToken from "../../infrastructure/services/generateToken"
import {hashPassword,verifyPassword} from '../../infrastructure/services/hash-password'


//usecase
import Login from "../usecase/login"
import CreateCategory from "../usecase/create-category"


const repository = new AdminRepository()

export const login = async (req:Request,res:Response) => {
    const data = {
        email : req.body.email,
        password : req.body.password
    }
    const dependencies = {
        repository,
        createToken,
        verifyPassword
    }

    const interactor = new Login(dependencies)
    const output = await interactor.exectue(data)
    res.status(output.status).json(output.response)
}



// create new category
export const createCategory = async (req:Request,res:Response) => {
    const data = {
        name :req.body.name,
        description : req.body.description
    }
    const dependencies = {
        createCategory : productPublisher.createNewCategory
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// create new product
export const createProduct = async (req:Request,res:Response) => {
    // const data = {
    //     email : req.body.email,
    //     password : req.body.password
    // }
    // const dependencies = {
    //     repository,
    //     createToken,
    //     verifyPassword
    // }

    // const interactor = new Login(dependencies)
    // const output = await interactor.exectue(data)
    // res.status(output.status).json(output.response)
}