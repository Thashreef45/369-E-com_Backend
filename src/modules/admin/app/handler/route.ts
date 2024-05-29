import express from "express";
import * as controller from './controller'
// import middleware from './middleware/middleware' //


const adminRouter = express()

//login
adminRouter.post('/login',controller.login)


//create category 
adminRouter.post('/category',controller.createProduct)  //-- pending category, subcategory


//create subcategory 
adminRouter.post('/subcategory',controller.createSubCategory)



//COMPLETED






//pending


//create product
adminRouter.post('/product',controller.createProduct)




//todo - -- pendings 
//get all products
adminRouter.get('/products',controller.login)

//get a product

//update a product



export default adminRouter


