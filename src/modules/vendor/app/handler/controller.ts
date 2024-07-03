import { Request, Response } from "express"

// publisher
import * as userPublisher from "./communication/publisher/user-publisher"
import * as productPublisher from "./communication/publisher/product-publisher"


// usecase
import AddProduct from "../usecase/add-product"
import GetAProduct from "../usecase/fetch-a-product"
import UpdateProduct from '../usecase/update-product'
import RemoveProduct from "../usecase/remove-product"
import FetchUserPost from "../usecase/fetch-user-posts"
import ActivatePost from "../usecase/activate-post"



//  create new product
export const addproduct =  async(req : Request, res : Response) => {
    const dependencies = {
        fetchUser : userPublisher.fetchUserByPhone,
        createProduct : productPublisher.createProduct
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
        fetchUser : userPublisher.fetchUserByPhone,
        updateProduct : productPublisher.updateProduct
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        images : req.body.images,
        categoryId: req.body.categoryId,
        productId : req.body.productId,
        phone : req.body.phone
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}



//  remove a product
export const removeProduct = async(req : Request, res : Response) => {
    const dependencies = {
        // fetchProduct : productPublisher.getProduct
        fetchUser : userPublisher.fetchUserByPhone,
        removeProduct : productPublisher.removeProduct
    }
    const data = {
        phone : req.body.phone,
        productId : req.body.productId
    }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)

    res.status(output.status).json(output.response)
}




//  fetch user posts
export const getUserPosts = async(req : Request, res : Response) => {
    const dependencies = {
        fetchUser : userPublisher.fetchUserByPhone,
        fetchUserPosts : productPublisher.fetchAllPost
    }
    
    const data = {
        phone : req.body.phone,
        query : req.query.active
    }

    const interactor = new FetchUserPost(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




//on work
// activate user product || post
export const activatePost = async(req : Request, res : Response) => {
    const dependencies = {
        fetchUser : userPublisher.fetchUserByPhone,
        activatePost : productPublisher.activatePost
    }

    const data = {
        phone : req.body.phone,
        productId : req.body.productId
    }

    const interactor = new ActivatePost(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}
