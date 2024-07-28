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


router.get('/products')  /// fetch all or by query parameters


router.patch('/product',controller.updateProduct)  // on work 2 ---- almost done


router.get('/orders')


router.patch('/order')


router.get('/sales')





