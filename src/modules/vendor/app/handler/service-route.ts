import express from 'express'
import * as controller from './service-controller'


const router = express()



// ====================== Category ======================

router.get('/categories',controller.fetchAllCategories)




// ====================== Serivice ======================


router.post('/service',controller.createService)

router.patch('/service',controller.updateService)

router.get('/service/:serviceId',controller.fetchAService) //fetch a single service

router.get('/services',controller.createService) //fetch all admin services

router.delete('/service',controller.deactivateService) // deactivate

router.post('/activate',controller.activateService)  // activate

















