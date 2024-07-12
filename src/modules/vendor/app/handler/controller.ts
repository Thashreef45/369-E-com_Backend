import { Request, Response } from "express"


//dependencies
import Repository from "../../infrastructure/repository/repository"

import { createTempToken , createToken } from "../../infrastructure/services/generateToken"
import generateOtp from "../../infrastructure/services/generate-otp"


// publisher
import * as userPublisher from "./communication/publisher/user-publisher"
import * as productPublisher from "./communication/publisher/product-publisher"
import * as notificationPublisher from './communication/publisher/notification-publisher'


// usecase
import AddProduct from "../usecase/marketplace/add-product"
import GetAProduct from "../usecase/marketplace/fetch-a-product"
import UpdateProduct from '../usecase/marketplace/update-product'
import RemoveProduct from "../usecase/marketplace/remove-product"
import FetchUserPost from "../usecase/marketplace/fetch-user-posts"
import ActivatePost from "../usecase/marketplace/activate-post"



// usecase --- ecom
import Register from "../usecase/e-com/register"
import VerifyOtp from "../usecase/e-com/verify-otp"


//repository instance
const repository = new Repository()



// registration
export const register = async (req : Request , res:Response) => {

    const dependencies = {
        repository: repository,
        createTempToken,
        generateOtp,
        sendOtpToEmail : notificationPublisher.sendOtpToEmail
    }

    const data = {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        about : req.body.about,
        password : req.body.password
    }

    const interactor = new Register(dependencies)

    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



//validate vendor otp

export const validateOtp = async (req:Request , res:Response) => {
    const dependencies = {
        repository ,
        createToken,
    }
    const data = {
        ... req.body
    }

    const interactor = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)

}

export const addproduct = async (req : Request , res:Response) => {
    const dependencies = {
        y : productPublisher.createProduct()
    }

    const data = {}

    const interactor  = new VerifyOtp(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



//=========================== || =========================== || =========================== 



// //  create new product
// export const addproduct =  async(req : Request, res : Response) => {
//     const dependencies = {
//         fetchUser : userPublisher.fetchUserByPhone,
//         createProduct : productPublisher.createProduct
//     }
//     const data = req.body

//     const interactor = new AddProduct(dependencies)
//     const output = await interactor.execute(data)

//     res.status(output.status).json(output.response)
// }



// //  fetch a product
// export const getProduct = async(req : Request, res : Response) => {
//     const dependencies = {
//         fetchProduct : productPublisher.getProduct
//     }
//     const data = {
//         productId : req.body.productId
//     }
//     const interactor = new GetAProduct(dependencies)
//     const output = await interactor.execute(data)

//     res.status(output.status).json(output.response)
// }



// // update a product
// export const updateProduct = async(req : Request, res : Response) => {
//     const dependencies = {
//         fetchUser : userPublisher.fetchUserByPhone,
//         updateProduct : productPublisher.updateProduct
//     }

//     const data = {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         thumbnail: req.body.thumbnail,
//         images : req.body.images,
//         categoryId: req.body.categoryId,
//         productId : req.body.productId,
//         phone : req.body.phone
//     }

//     const interactor = new UpdateProduct(dependencies)
//     const output = await interactor.execute(data)

//     res.status(output.status).json(output.response)
// }



// //  remove a product
// export const removeProduct = async(req : Request, res : Response) => {
//     const dependencies = {
//         // fetchProduct : productPublisher.getProduct
//         fetchUser : userPublisher.fetchUserByPhone,
//         removeProduct : productPublisher.removeProduct
//     }
//     const data = {
//         phone : req.body.phone,
//         productId : req.body.productId
//     }

//     const interactor = new RemoveProduct(dependencies)
//     const output = await interactor.execute(data)

//     res.status(output.status).json(output.response)
// }




// //  fetch user posts
// export const getUserPosts = async(req : Request, res : Response) => {
//     const dependencies = {
//         fetchUser : userPublisher.fetchUserByPhone,
//         fetchUserPosts : productPublisher.fetchAllPost
//     }
    
//     const data = {
//         phone : req.body.phone,
//         query : req.query.active
//     }

//     const interactor = new FetchUserPost(dependencies)
//     const output = await interactor.execute(data)
//     res.status(output.status).json(output.response)
// }




// //on work
// // activate user product || post
// export const activatePost = async(req : Request, res : Response) => {
//     const dependencies = {
//         fetchUser : userPublisher.fetchUserByPhone,
//         activatePost : productPublisher.activatePost
//     }

//     const data = {
//         phone : req.body.phone,
//         productId : req.body.productId
//     }

//     const interactor = new ActivatePost(dependencies)
//     const output = await interactor.execute(data)
//     res.status(output.status).json(output.response)

// }
