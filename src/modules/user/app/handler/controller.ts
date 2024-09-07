//packages
import { Request, Response } from "express";

//event publishers
import * as notificationPublisher from './communication/publisher/notification-publisher' //notification event publisher
import * as productPublisher from './communication/publisher/product-publisher' // product event publisher
import * as orderPublisher from './communication/publisher/order-publisher' // order event publisher


// response wrapper
import responseHandler from "./response-handler";


//dependencies
import userRepository from '../../infrastructure/repository/user-repository'

//services
import generateOtp from '../../infrastructure/services/generate-otp'
import { createAccessToken, createRefreshToken, createTempToken } from '../../infrastructure/services/generateToken'

//usecase
import Login_Signup from '../usecase/B2C/login-signup'
import VerifyOtp from "../usecase/B2C/verify-otp";
import GetCartItems from "../usecase/B2C/get-cart-items";
import UpdateCartItem from "../usecase/B2C/update-cart";
import AddToCart from "../usecase/B2C/add-to-cart";
import DeletFromCart from "../usecase/B2C/remove-from-cart";
import AddToWishlist from "../usecase/B2C/add-to-wishlist";
import RemoveFromWishlist from "../usecase/B2C/remove-from-wishlist";
import GetAllProducts from '../usecase/B2C/get-all-products'
import AddNewAddress from "../usecase/B2C/add-new-address";
import GetAddress from "../usecase/B2C/get-a-address";
import DeleteAddress from "../usecase/B2C/remove-a-address";
import UpdateAddress from "../usecase/B2C/update-a-address";
import FetchAllAddress from "../usecase/B2C/fetch-all-address";
import GetProduct from "../usecase/B2C/get-a-product";
import FetchWishlist from "../usecase/B2C/fetch-user-wishlist";
import CartCheckout from "../usecase/B2C/cart-checkout";
import FetchAllCategories from "../usecase/B2C/fetch-all-categories";
import ProductRating from "../usecase/B2C/product-rating";
import FetchOrders from "../usecase/B2C/fetch-orders";
import FetchAOrder from "../usecase/B2C/fetch-a-order";
import ProductCheckout from "../usecase/B2C/product-checkout";
import CancelOrder from "../usecase/B2C/cancel-order";
import ResendOTP from "../usecase/B2C/resend-otp";
import FetchProductFeedbacks from "../usecase/B2C/fetch-feedbacks";




//repository instance
const repository = new userRepository()




//----------------------- Handler functions -----------------------



export const login_signup = async (req: Request, res: Response) => {
    const data = {
        phone: req.body?.phone
    }
    const dependencies = {
        repository,
        generateOtp,
        createToken: createTempToken,
        sendOtp: notificationPublisher.sendLoginSignUpOtp
    }

    const interactor = new Login_Signup(dependencies)
    const output = await interactor.execute(data)

    responseHandler(req, res, output)
}






// verify otp 
export const verifyOtp = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        otp: req.body?.otp
    }
    const dependencies = {

        createAccessToken,
        createRefreshToken,
        repository
    }

    const interactor = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}





// verify otp 
export const resendOtp = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
    }
    const dependencies = {

        generateOtp,
        createToken: createTempToken,
        sendOtp: notificationPublisher.sendLoginSignUpOtp,

        repository
    }

    const interactor = new ResendOTP(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}





// fetch user cart 
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
    responseHandler(req, res, output)
}





//add to cart
export const addToCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body?.productId,
    }
    const dependencies = {
        getProduct: productPublisher.getProduct,
        repository,
    }

    const interactor = new AddToCart(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}





// update cart count
export const updateCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body?.productId,
        count: req.body?.count
    }
    const dependencies = {
        getProduct: productPublisher.getProduct,
        repository,
    }

    const interactor = new UpdateCartItem(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}






//remove from cart
export const removeFromCart = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body?.productId,
    }
    const dependencies = {
        repository,
    }

    const interactor = new DeletFromCart(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}





// add to wishlist
export const addToWishlist = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        productId: req.body?.productId,
    }
    const dependencies = {
        getProduct: productPublisher.getProduct,
        repository,
    }

    const interactor = new AddToWishlist(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}





// fetch user wishlist
export const fetchWishlist = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
    }
    const dependencies = {
        repository,
        getProducts: productPublisher.getProductsById
    }

    const interactor = new FetchWishlist(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
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
    responseHandler(req, res, output)
}





// fetch all products || filter by queries
export const getProducts = async (req: Request, res: Response) => {

    const query = req.query
    const dependencies = {
        getAllProducts: productPublisher.getProducts
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute(query)
    responseHandler(req, res, output)
}




/** fetch a product */
export const fetchProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.params.productId
    }
    const dependencies = {
        getProduct: productPublisher.getProduct
    }

    const interactor = new GetProduct(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)

}



/** fetch  product feedbacks */
export const fetchProductFeedbacks = async (req: Request, res: Response) => {

    const data = {
        productId: req.query.productId as string,
        page_no: Number(req.query.page_no as string),
        limit: Number(req.query.limit as string),
        // GET /api/feedbacks?productId=123&limit=10&page_no=2
    }
    const dependencies = {
        getProductFeedbacks: productPublisher.getProductFeedbacks,
        repository
    }

    const interactor = new FetchProductFeedbacks(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}




// fetch all categories
export const getCategories = async (req: Request, res: Response) => {

    const dependencies = {
        fetchCategories: productPublisher.getCategories
    }

    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    responseHandler(req, res, output)
}





// rate a product  -- pending
export const rateProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.body?.productId,
        rating: req.body?.rating,
        comment: req.body?.comment,
        phone: req.body?.phone
    }

    const dependencies = {
        repository,
        rateProduct: productPublisher.rateProduct,
        fetchOrder: orderPublisher.fetchAOrder
    }

    const interactor = new ProductRating(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




// add a address
export const addAddress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone, // Identity
        address: {
            name: req.body?.address?.name,
            address: req.body?.address?.address,
            phone: req.body?.address?.phone,
            pin: req.body?.address?.pin
        }
    }
    const dependencies = {
        repository,
    }

    const interactor = new AddNewAddress(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
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
    responseHandler(req, res, output)
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
    responseHandler(req, res, output)
}




/** fetch all address */
export const getAlladdress = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
    }
    const dependencies = {
        repository,
    }

    const interactor = new FetchAllAddress(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
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
    responseHandler(req, res, output)
}




// cart checkout
export const cartCheckout = async (req: Request, res: Response) => {
    const data = {
        phone: req.body?.phone,
        addressId: req.body?.addressId,
        cod: req.body?.cod
    }
    const dependencies = {
        repository,

        getProductsById: productPublisher.getProductsById,

        checkoutCart: productPublisher.checkoutCart,
        createOrder: orderPublisher.creatOrder,
    }

    const interactor = new CartCheckout(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}




// Product checkout
export const productCheckout = async (req: Request, res: Response) => {
    const data = {
        phone: req.body?.phone, // from token
        addressId: req.body?.addressId,
        productId: req.body?.productId,
        quantity: req.body?.quantity,
        cod: req.body?.cod
    }
    const dependencies = {
        repository,
        updateStock: productPublisher.checkoutCart,
        fetchProductWithId: productPublisher.getProduct,
        // createProductOrder: () => { }
    }

    const interactor = new ProductCheckout(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}




/** Fetch all user orders */
export const fetchAllOrders = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
    }
    const dependencies = {
        repository,
        getProductsById: productPublisher.getProductsById,
        fetchUserOrders: orderPublisher.fetchOrders
    }

    const interactor = new FetchOrders(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}


/** Fetch all user orders */
export const fetchAOrder = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        orderId: req.params.orderId
    }
    const dependencies = {
        repository,
        fetchProduct: productPublisher.getProduct,
        fetchOrder: orderPublisher.fetchOrder
    }

    const interactor = new FetchAOrder(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}



/** Fetch all user orders */
export const cancelOrder = async (req: Request, res: Response) => {
    const data = {
        phone: req.body.phone,
        orderId: req.body.orderId
    }
    const dependencies = {
        repository,
        cancelOrder: orderPublisher.cancelOrder
    }

    const interactor = new CancelOrder(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}