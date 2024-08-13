import express from 'express'
import * as controller from './controller-B2B'


const router = express()


// ==================== CATEGORY ====================

router.post('/category',controller.createCategory)

router.patch('/category',controller.updateCategory)

router.post('/sub-category',controller.createSubCategory)

router.patch('/sub-category',controller.updateSubCategory)

router.get('/category',controller.fetchCategories)

// ==================== PRODUCT ====================

router.post('/product',controller.createProduct)

router.patch('/product',controller.updateProduct)

router.delete('/product',controller.deactivateProduct)

router.post('/activate',controller.activatePost)


router.get('/product/:productId',controller.fetchAProduct)


/** Fetch admin B2B products */
router.get('/products',controller.fetchProducts)




