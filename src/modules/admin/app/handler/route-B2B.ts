import express from 'express'
import * as controller from './controller-B2B'


const router = express()


router.post('/product',controller.createProduct)

router.patch('/product',controller.updateProduct)

router.delete('/product',controller.deactivateProduct)

router.post('/activate',controller.activatePost)

