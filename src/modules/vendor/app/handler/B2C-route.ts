import express from 'express'
import * as controller from './B2C-controller'
import middleware from './middleware/middleware'


/** Demo function, have to implement seperately */
const otpMiddlware = () => {}  

const router = express()


//register

router.post('/register',controller.register) // no need of middleware


router.post('/otp',otpMiddlware,controller.validateOtp)


router.patch('/otp',controller.resendOtp)  // no need of middleware


router.post('/login',controller.login) // no need of middleware


router.post('/product',middleware,controller.addproduct) 


router.get('/product/:productId',middleware,controller.getProduct)


router.get('/products',middleware,controller.fetchAllProducts)


router.patch('/product',middleware,controller.updateProduct)


router.get('/orders',middleware,controller.getAllOrders)


router.get('/order/:orderId',middleware,controller.fetchAOrder)


router.patch('/order',middleware,controller.updateOrder)  //on work


// router.get('/sales',middleware,controller.hey) /** can be implemented with /orders api */





