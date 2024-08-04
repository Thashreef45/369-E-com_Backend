import express from "express";
import * as controller from './controller'

//middleware
import middleware from './middleware/middleware' //
import otpMiddleware from "./middleware/otp-middleware";


const userRouter = express()


userRouter.post('/login',controller.login_signup)


userRouter.post('/otp',otpMiddleware,controller.verifyOtp)


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


//fetch all address 
userRouter.get('/address',middleware,controller.getAlladdress)


//fetch a address
// userRouter.get('/address/:addressId',middleware,controller.getAddress)



//update a address
userRouter.patch('/address',middleware,controller.updateAddress)



//remove address
userRouter.delete('/address',middleware,controller.deleteAddress)



//fetch all categories
userRouter.get('/categories',controller.getCategories) 

// -----------------------------------------------------



//--------------------------------- pending work -------------------------------------------------




// rate a product 
userRouter.post('/rate',middleware,controller.rateProduct);




//Product checkout
userRouter.post('/checkout',middleware,controller.productCheckout) //pending work*****



// Cart checkout
userRouter.post('/cart/checkout',middleware,controller.cartCheckout) //pending work******



// verify payement
userRouter.post('/payment',controller.rateProduct)  //pending work



// userRouter.use(express.text())
// userRouter.post('/test',(req:any,res:any)=>{


//     console.log(req.body,'Recieved here -- plain/text')
//     res.end()
// })



/**fetch user orders */
userRouter.get('/orders',controller.fetchAllOrders)



/** Fetch user order with orderId */
userRouter.get('/order/:orderId',controller.fetchAOrder)




/** Fetch user order with orderId */
userRouter.delete('/order',controller.cancelOrder)



export default userRouter


