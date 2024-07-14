import express from 'express'
import * as controller from './B2B-controller'
import middleware from './middleware/middleware'

const router = express()


// add product
router.post('/product',controller.addproduct)


// get product
router.get('/product',controller.getProduct)


// update product
router.patch('/product',controller.updateProduct)



// remove product
router.delete('/product',controller.getUserPosts)



// fetch user posts
router.get('/posts',controller.getUserPosts)



//on work
// update - reactivate post
router.post('/active',controller.activatePost)





// get all products || filtered by query
// router.get('/products',controller.fetchProducts) // todo : logic side




// router.post('/sold',controller.soldProductUpdate)  // todo : api name


// fetch all user sale post
// router.get('/post',controller.soldProductUpdate)


export default router

