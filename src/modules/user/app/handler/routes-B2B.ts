import express from "express";
import * as controller from './controller-B2B'

//middleware
import middleware from './middleware/middleware' //
import otpMiddleware from "./middleware/otp-middleware";


const B2BRouter = express()

B2BRouter.get('/categories',controller.fetchAllCategories)

B2BRouter.get('/products',controller.getProducts) //pending

B2BRouter.get('/product/:productId',controller.fetchProduct)


export default B2BRouter

