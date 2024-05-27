//packages
import { Request, Response } from "express";

//event publishers
import * as notificationPublisher from './communication/publisher/notification-publisher' //notification event publisher
import * as productPublisher from './communication/publisher/product-publisher' // product event publisher


//dependencies
import userRepository from '../../infrastructure/repository/user-repository'
//services
import generateOtp from '../../infrastructure/services/generate-otp'
import createToken from '../../infrastructure/services/generateToken'

//usecase
import Login_Signup from '../usecase/login-signup'
import VerifyOtp from "../usecase/verify-otp";
import GetCartItems from "../usecase/get-cart-items";
import UpdateCartItem from "../usecase/update-cart";
import AddToCart from "../usecase/add-to-cart";
import DeletFromCart from "../usecase/remove-from-cart";
import AddToWishlist from "../usecase/add-to-wishlist";
import RemoveFromWishlist from "../usecase/remove-from-wishlist";
import GetAllProducts from '../usecase/get-all-products'
import AddNewAddress from "../usecase/add-new-address";
import GetAddress from "../usecase/get-a-address";
import DeleteAddress from "../usecase/remove-a-address";
import UpdateAddress from "../usecase/update-a-address";

//repository instance
const repository = new userRepository()




// Handler functions

export const login_signup = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone
    }
    const dependencies = {
        repository,
        generateOtp,
        createToken,
        sendOtp: notificationPublisher.sendLoginSignUpOtp
    }

    const interactor = new Login_Signup(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


export const verifyOtp = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        otp: req.body.otp
    }
    const dependencies = {
        repository
    }

    const interactor = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

    // console.log("hey , whatsup!")
}


export const getCartItems = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
    }
    const dependencies = {
        repository,
        getProducts: productPublisher.getProductsById
    }

    const interactor = new GetCartItems(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}

//add to cart
export const addToCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body.productId,
    }
    const dependencies = {
        repository,
    }

    const interactor = new AddToCart(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


// update cart count
export const updateCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body.productId,
        count: req.body.count
    }
    const dependencies = {
        repository,
    }

    const interactor = new UpdateCartItem(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


//remove from cart
export const removeFromCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body.productId,
    }
    const dependencies = {
        repository,
    }

    const interactor = new DeletFromCart(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


// add to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body.productId,
    }
    const dependencies = {
        repository,
    }

    const interactor = new AddToWishlist(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


//remove from wishlist
export const removeFromWishlist = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body.productId,
    }
    const dependencies = {
        repository,
    }

    const interactor = new RemoveFromWishlist(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


// fetch all products
export const getProducts = async (req: Request, res: Response) => {

    const dependencies = {
        getAllProducts: productPublisher.getProducts
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute()
    res.status(output.status).json(output.response)
}




// fetch a product
export const fetchProduct = async (req: Request, res: Response) => {

    const dependencies = {
        getAllProducts: productPublisher.getProduct
    }

    // const interactor = new GetAllProducts(dependencies)
    // const output = await interactor.execute()
    // res.status(output.status).json(output.response)
}


// add a address
export const addAddress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone, // Identity
        address: {
            name: req.body.address.name,
            address: req.body.address.address,
            phone: req.body.address.phone,
            pin: req.body.address.pin
        }
    }
    const dependencies = {
        repository,
    }

    const interactor = new AddNewAddress(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


// fetch a address
export const getAddress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        addressId: req.body.addressId
    }
    const dependencies = {
        repository,
    }

    const interactor = new GetAddress(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// update a address
export const updateAddress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        addressId: req.body.addressId,
        address: {
            name: req.body.address.name,
            address: req.body.address.address,
            phone: req.body.address.phone,
            pin: req.body.address.pin
        }
    }
    const dependencies = {
        repository,
    }

    const interactor = new UpdateAddress(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




// delete a address
export const deleteAddress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        addressId: req.body.addressId
    }
    const dependencies = {
        repository,
    }

    const interactor = new DeleteAddress(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}