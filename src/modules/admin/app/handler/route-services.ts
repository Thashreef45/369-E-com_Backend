import express from 'express'
import * as controller from './controller-service'


const router = express()



// ====================== Category ======================
router.post('/category',controller.createCategory)

router.patch('/category',controller.updateCategory)

router.post('/sub-category',controller.createSubCategory)

router.patch('/sub-category',controller.updateSubCategory)

router.get('/categories',controller.fetchAllCategories)




// ====================== Serivice ======================


router.post('/service',controller.createService)

router.patch('/service',controller.updateService)

router.get('/service',controller.createService) //fetch a single service

// router.get('/services',controller.createService) fetch all services


// router.delete('/service',controller.createService) // deactivate

// router.get('/activate',controller.createService)  // activate

















