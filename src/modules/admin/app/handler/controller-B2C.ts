import { Request, Response } from "express"

//event publishers
import * as productPublisher from './communication/publisher/product-publisher'
import * as userPublisher from './communication/publisher/user-publisher'
import * as orderPublisher from './communication/publisher/order-publisher'


//dependencies
import AdminRepository from "../../infrastructure/repository/admin-repository"

//services
import createToken from "../../infrastructure/services/generateToken"
import { hashPassword, verifyPassword } from '../../infrastructure/services/hash-password'





//usecase
import Login from "../usecase/B2C/login"
import UpdateProfile from "../usecase/B2C/update-profile"

import CreateCategory from "../usecase/B2C/create-category"
import CreateSubCategory from "../usecase/B2C/create-subcategory"
import CreateProduct from "../usecase/B2C/create-product"
import FetchAllCategory from "../usecase/B2C/fetch-all-category"
import GetAllProducts from "../usecase/B2C/get-all-products"
import GetProduct from "../usecase/B2C/get-a-product"
import UpdateProduct from "../usecase/B2C/update-a-product"


//Membership
import CreateMembership from "../usecase/B2C/create-membership"
import UpdateMembership from "../usecase/B2C/update-membership"

//Order Management
import FetchOrders from "../usecase/B2C/fetch-orders"
import FetchAOrder from "../usecase/B2C/fetch-a-order"
import UpdateOrder from "../usecase/B2C/update-order"





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
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


//login
export const updateProfile = async (req: Request, res: Response) => {
    const data = {
        email: req.body?.email,
        whatsapp: req.body?.whatsapp,
        phone: req.body?.phone // from  middleware
    }
    const dependencies = {
        repository,
    }

    const interactor = new UpdateProfile(dependencies)
    const output = await interactor.execute(data)
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






/**create new product */
export const createProduct = async (req: Request, res: Response) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
    }
    const dependencies = {
        createProduct: productPublisher.createNewProduct
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}





// fetch all products || filtered by queries {query,category}
export const getAllProducts = async (req: Request, res: Response) => {
    const query = req.query

    const dependencies = {
        getAllProducts: productPublisher.getProducts
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute(query)
    res.status(output.status).json(output.response)
}




// fetch a product
export const getAProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.params.productId
    }
    const dependencies = {
        fetchProduct: productPublisher.getProduct
    }

    const interactor = new GetProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}





// update a product
export const updateProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.body?.productId,
        name: req.body?.name,//String
        description: req.body?.description,//String
        price: req.body?.price, //Number,

        actualPrice: req.body?.actualPrice,
        offer: req.body?.offer,

        images: req.body?.images, //[String]
        thumbnail: req.body?.thumbnail,//String
        stock: req.body?.stock,// Number
        categoryId: req.body?.categoryId,
        subCategoryId: req.body?.subCategoryId,
        email: req.body?.email

    }
    const dependencies = {
        updateProduct: productPublisher.updateProduct,
        repository,
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



//  MEMBERSHIP

//create new user membership
export const createMembership = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        createMembership: userPublisher.createMembership
    }
    const data = { ...req.body }

    const interactor = new CreateMembership(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




// update user membership
export const updateMembership = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        updateMembership: userPublisher.updateMembership
    }
    const data = { ...req.body }

    const interactor = new UpdateMembership(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Fetch orders by queries -- {status,data,page_no,limit} */
export const fetchOrders = async (req: Request, res: Response) => {
    
    const dependencies = {
        repository,
        fetchAdminProducts: productPublisher.getProducts,
        fetchOrdersWithIds: orderPublisher.fetchOrdersWithIds
    }

    const data = {
        email: req.body?.email,
        status: req.query?.status as string,
    
        startDate: req.query?.startDate as string,
        endDate: req.query?.endDate as string,
        
        page_no: parseInt(req.query?.page_no as string, 10),
        limit: parseInt(req.query?.limit as string, 10)

    }

    const interactor = new FetchOrders(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




/** Fetch a order with ownerId and status */
export const fetchAOrder = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        fetchOrder: orderPublisher.fetchOrder,
        fetchProduct: productPublisher.getProduct,
        fetchUser: userPublisher.fetchUserById
    }

    const data = {
        email: req.body?.email,
        orderId: req.params.orderId
    }

    const interactor = new FetchAOrder(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




/** Update order status */
export const updateOrderStatus = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        updateOrder: orderPublisher.updateOrderStatus,
    }

    const data = {
        email: req.body?.email,
        orderId: req.params.orderId
    }

    const interactor = new UpdateOrder(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


