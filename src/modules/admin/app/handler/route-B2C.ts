import express from "express";
import * as controller from './controller-B2C'
import middleware from './middleware/verity-token'


const router = express()

//login
router.post('/login', controller.login)


// update profile
router.post('/profile',controller.updateProfile)


//create category 
router.post('/category', middleware, controller.createCategory)


//create subcategory 
router.post('/subcategory', controller.createSubCategory)



// get all catogery with subcategory
router.get('/category', controller.fetchAllCategory)



//create product
router.post('/product', controller.createProduct)



//get a product
router.get('/product/:productId', controller.getAProduct)

//-----------------------COMPLETED-------------------



//get all products   <<----------->> Pending works are there , have to recheck
router.get('/products', controller.getAllProducts)



// ---------------------------   Working on    -------------------------------


// update a product 
router.patch('/product', controller.updateProduct)





//==================== USER MEMBERSHIP ====================

router.post('/membership', controller.createMembership)


// edit membership
router.patch('/membership', controller.updateMembership)

///////////////////////////////////////////////////////




router.get('/orders', controller.fetchOrders)



router.get('/order/:orderId', controller.fetchAOrder) 



router.patch('/order', controller.updateOrderStatus)//done



// router.get('/users',controller.fetchUsers) *not importants



export default router


