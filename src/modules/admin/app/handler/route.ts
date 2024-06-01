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



// get all catogery with subcategory
adminRouter.get('/category',controller.fetchAllCategory)



//create product
adminRouter.post('/product',controller.createProduct)


//-----------------------COMPLETED-------------------



//get all products
adminRouter.get('/products',controller.getAllProducts)

//pending


//fetch a product






//todo - -- pendings 


//get a product

//update a product



export default adminRouter


