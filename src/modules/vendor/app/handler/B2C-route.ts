import express from 'express'
import * as controller from './B2C-controller'
import middleware from './middleware/middleware'

const router = express()


//register

router.post('/register',controller.register)


router.post('/otp',controller.validateOtp)


router.patch('/otp',controller.resendOtp)  // on work 1


router.post('/login',controller.login)


router.post('/product',controller.addproduct)


router.get('/product/:productId',controller.getProduct)


router.get('/products',controller.fetchAllProducts)


router.patch('/product',controller.updateProduct)


router.get('/orders',controller.getAllOrders)


router.get('/order/:orderId',controller.fetchAOrder)


router.patch('/order',controller.updateOrder)  //on work


router.get('/sales')





