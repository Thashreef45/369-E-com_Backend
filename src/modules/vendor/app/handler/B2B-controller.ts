import { Request, Response } from "express"


// publisher
import * as userPublisher from "./communication/publisher/user-publisher"
import * as productPublisher from "./communication/publisher/B2B-product-publisher"
import * as notificationPublisher from './communication/publisher/notification-publisher'


//dependencies
import Repository from "../../infrastructure/repository/repository"


// usecase
import AddProduct from "../usecase/B2B/add-product"
import GetAProduct from "../usecase/B2B/fetch-a-product"
import UpdateProduct from '../usecase/B2B/update-product'
import RemoveProduct from "../usecase/B2B/remove-product"
import FetchUserPost from "../usecase/B2B/fetch-user-posts"
import ActivatePost from "../usecase/B2B/activate-post"


//repository instance
const repository = new Repository()


//  create new product
export const addproduct =  async(req : Request, res : Response) => {
    const dependencies = {
        createProduct : productPublisher.createProduct,
        repository,
    }
    const data = req.body

    const interactor = new AddProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}



//  fetch a product
export const getProduct = async(req : Request, res : Response) => {
    const dependencies = {
        fetchProduct : productPublisher.getProduct
    }
    const data = {
        productId : req.body.productId
    }
    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}



// update a product
export const updateProduct = async(req : Request, res : Response) => {
    const dependencies = {
        updateProduct : productPublisher.updateProduct,
        repository,
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        images : req.body.images,
        categoryId: req.body.categoryId,
        productId : req.body.productId,
        email : req.body.email
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}



//  remove a product
export const removeProduct = async(req : Request, res : Response) => {
    const dependencies = {
        // fetchProduct : productPublisher.getProduct ==

        removeProduct : productPublisher.removeProduct,
        repository
    }
    const data = {
        email : req.body.email,
        productId : req.body.productId
    }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}




//  fetch user posts
export const getVenodrPosts = async(req : Request, res : Response) => {
    const dependencies = {
        fetchUserPosts : productPublisher.fetchAllPost,
        repository,
    }
    
    const data = {
        email : req.body?.email,
        query : req.query?.ActivatePost
    }

    const interactor = new FetchUserPost(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




//on work
// activate user product || post
export const activatePost = async(req : Request, res : Response) => {
    const dependencies = {
        // fetchUser : userPublisher.fetchUserByPhone,
        activatePost : productPublisher.activatePost,
        repository
    }

    const data = {
        email : req.body.email,
        productId : req.body.productId
    }

    const interactor = new ActivatePost(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}
