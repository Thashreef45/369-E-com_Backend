import express from 'express'
import * as controller from './B2C-controller'
import middleware from './middleware/middleware'

const router = express()


//register
router.post('/register',controller.register)