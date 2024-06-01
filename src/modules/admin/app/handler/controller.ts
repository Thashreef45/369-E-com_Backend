//packages
import { Request, Response } from "express"

//event publishers
import * as productPublisher from '../handler/communication/publisher/product-publisher'

//dependencies
import AdminRepository from "../../infrastructure/repository/admin-repository"
//services
import createToken from "../../infrastructure/services/generateToken"
import { hashPassword, verifyPassword } from '../../infrastructure/services/hash-password'


//usecase
import Login from "../usecase/login"
import CreateCategory from "../usecase/create-category"
import CreateSubCategory from "../usecase/create-subcategory"
import CreateProduct from "../usecase/create-product"
import FetchAllCategory from "../usecase/fetch-all-category"
import GetAllProducts from "../usecase/get-all-products"


const repository = new AdminRepository()


//login 
export const login = async (req: Request, res: Response) => {
    const data = {
        email: req.body.email,
        password: req.body.password
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
export const createCategory = async (req: Request, res: Response) => {
    const data = {
        name: req.body.name,
        description: req.body.description
    }
    const dependencies = {
        createCategory: productPublisher.createNewCategory
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// create new subcategory
export const createSubCategory = async (req: Request, res: Response) => {
    const data = {
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description
    }
    const dependencies = {
        createNewSubCategory: productPublisher.createNewSubCategory
    }

    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// Fetch all category and sub-category
export const fetchAllCategory = async (req: Request, res: Response) => {

    const dependencies = {
        fetchAllCategory: productPublisher.getAllCategories
    }

    const interactor = new FetchAllCategory(dependencies)
    const output = await interactor.execute()
    res.status(output.status).json(output.response)
}



// create new product
export const createProduct = async (req: Request, res: Response) => {
    const data = {
        name: req.body.name,//String
        description: req.body.description ,//String
        price: req.body.price , //Number,
        images: req.body.images , //[String]
        thumbnail:  req.body.thumbnail,//String
        stock: req.body.stock ,// Number
        categoryId : req.body.categoryId,
        subCategoryId : req.body.subCategoryId,
    }
    const dependencies = {
        createProduct: productPublisher.createNewProduct
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




// fetch all products || filtered by queries

export const getAllProducts = async (req: Request, res: Response) => {
    const query = req.query

    const dependencies = {
        getAllProducts: productPublisher.getProducts
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute(query)
    res.status(output.status).json(output.response)
}

