import { Request, Response } from "express"

// publisher
import * as notificationPublisher from './communication/publisher/notification-publisher'
import * as productPublisher from "./communication/publisher/B2C-product-publisher"
import * as orderPublisher from './communication/publisher/order-publisher'
import * as userPublisher from './communication/publisher/user-publisher'



//dependencies
import Repository from "../../infrastructure/repository/repository"

import { createOtpToken, createToken } from "../../infrastructure/services/generateToken"
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

import FetchAllProducts from "../usecase/B2C/fetch-all-products"

import FetchOrders from "../usecase/B2C/fetch-all-orders"
import FetchAOrder from "../usecase/B2C/fetch-a-order"
import UpdateOrder from "../usecase/B2C/update-order"
import FetchSales from "../usecase/B2C/fetch-sales"




//repository instance
const repository = new Repository()



// registration
export const register = async (req: Request, res: Response) => {

    const dependencies = {
        repository: repository,
        createOtpToken,
        hashPassword: hashPassword,
        generateOtp,
        sendOtpToEmail: notificationPublisher.sendOtpToEmail,
    }

    const data = {
        name: req.body?.name,
        phone: req.body?.phone,
        email: req.body?.email,
        about: req.body?.about,
        password: req.body?.password,
        whatsapp: req.body?.whatsapp
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
        sendOtp: notificationPublisher.sendOtpToEmail,
        createOtpToken
    }
    const data = {
        email: req.body?.email
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

/** Edit a product */
export const updateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        updateProduct: productPublisher.updateProduct
    }

    const data = { ...req.body }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// fetch all product
export const fetchAllProducts = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        getAllProducts: productPublisher.getAllProducts
    }

    const data = {
        email: req.body?.email,
        query: req.query,
    }

    const interactor = new FetchAllProducts(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Fetch all order with ownerId and status */
export const getAllOrders = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        getOwnerProducts: productPublisher.getAllProducts,
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



/** Fetch a order with ownerId */
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



/** Update order status by orderId*/
export const updateOrder = async (req: Request, res: Response) => {
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




/** sales -----***any  */
export const hey = async (req: Request, res: Response) => {
    const dependencies = {
        repository,
        getOwnerProducts: productPublisher.getAllProducts,
        fetchOrdersWithIds: orderPublisher.fetchOrdersWithIds
    }

    const data = {
        email : req.body?.email,
        startDate : req.query?.startDate as string,
        endDate : req.query?.endDate as string
    }

    // const data = {

    //     start: "", // date
    //     end: "",// date
    //     email: req.body?.email,
    //     // orderId : req.params.orderId
    //     // query : req.query  /// { * : '',&:""} * many*any
    // }

    const interactor = new FetchSales(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}
