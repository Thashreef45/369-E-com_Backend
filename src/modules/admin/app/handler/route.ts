import express from "express";
import * as controller from './controller'
import middleware from './middleware/verity-token' //


const router = express()

//login
router.post('/login',controller.login)


//create category 
router.post('/category',middleware,controller.createCategory)


//create subcategory 
router.post('/subcategory',controller.createSubCategory)



// get all catogery with subcategory
router.get('/category',controller.fetchAllCategory)



//create product
router.post('/product',controller.createProduct)



//get a product
router.get('/product/:productId',controller.getAProduct)

//-----------------------COMPLETED-------------------



//get all products   <<----------->> Pending works are there , have to recheck
router.get('/products',controller.getAllProducts)



// ---------------------------   Working on    -------------------------------


// update a product 
router.patch('/product',controller.updateProduct)



// fetch all users 
// router.get('/products',controller)







//pending


//fetch a product






//todo - -- pendings 


//get a product

//update a product



export default router


