import express from "express";
import * as controller from './controller-vendor'


import middleware from './middleware/verity-token'



const router = express()

//fetch all vendors
router.get('/registrations',controller.registrationRequests) 


router.get('/registration/:vendorId',controller.getARegistaraionProfile) 

/** */
router.patch('/registration',controller.activateVendor)


router.get('/profiles',controller.getARegistaraionProfile) // ****


router.get('/profile/:vendorId',controller.getARegistaraionProfile) // ****







