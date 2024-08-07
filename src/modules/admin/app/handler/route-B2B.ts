import express from 'express'
import * as controller from './controller-B2B'


const router = express()




router.post('/category',controller.createCategory)

router.post('/product',controller.createProduct)

router.patch('/product',controller.updateProduct)

router.delete('/product',controller.deactivateProduct)

router.post('/activate',controller.activatePost)

//////////on-work


router.get('/product/:productId',controller.fetchAProduct)


/** Fetch admin B2B products */
router.get('/products',controller.fetchProducts)




