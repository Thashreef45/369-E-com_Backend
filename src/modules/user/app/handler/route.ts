import express from "express";
import * as controller from './controller'
import middleware from './middleware/middleware' //


const userRouter = express()


userRouter.post('/login',controller.login_signup)


userRouter.post('/otp',middleware,controller.verifyOtp)


userRouter.get('/cart',middleware,controller.getCartItems)


userRouter.post('/cart',middleware,controller.addToCart)


// --- increase/decrease cart product count
userRouter.patch('/cart',middleware,controller.updateCart)


//delete item from cart
userRouter.delete('/cart',middleware,controller.removeFromCart)



// add to wishlist
userRouter.post('/wishlist',middleware,controller.addToWishlist)



//fetch wishlist
userRouter.get('/wishlist',middleware,controller.fetchWishlist)



// remove from wishlist
userRouter.delete('/wishlist',middleware,controller.removeFromWishlist)



// get all products / filtering by queries
userRouter.get('/products',controller.getProducts)



// fetching a single product
userRouter.get('/product/:productId',controller.fetchProduct)



//add new address
userRouter.post('/address',middleware,controller.addAddress)



//fetch a address
userRouter.get('/address/:addressId',middleware,controller.getAddress)



//update a address
userRouter.patch('/address',middleware,controller.updateAddress)



// -----------------------------------------------------




//remove address
userRouter.delete('/address',middleware,controller.deleteAddress)
















//--------------------------------- pending work -------------------------------------------------


// rate a product 
userRouter.post('/rate',controller.rateProduct)  

//payment
// userRouter.post('/checkout',middleware,controller)







export default userRouter


