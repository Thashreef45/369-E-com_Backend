import express from "express";
import * as controller from './controller-service'

//middleware
import middleware from './middleware/middleware' //


const ServiceRouter = express()

ServiceRouter.get('/categories',controller.fetchAllCategories)

ServiceRouter.get('/services',controller.fetchAllServices)

ServiceRouter.get('/service/:serviceId',controller.fetchAService)

export default ServiceRouter

