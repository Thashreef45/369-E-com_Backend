import express from 'express'
import * as controller from './B2B-controller'
import middleware from './middleware/middleware'

const router = express()


// add product
router.post('/product',controller.addproduct)


// get a product
router.get('/product/:productId',controller.getProduct)


// update a product
router.patch('/product',controller.updateProduct)



// remove product
router.delete('/product',controller.deactivateProduct)



// fetch user posts
router.get('/products',controller.getVenodrProducts)



//on work
// update - reactivate post
router.post('/activate',controller.activatePost)



export default router

