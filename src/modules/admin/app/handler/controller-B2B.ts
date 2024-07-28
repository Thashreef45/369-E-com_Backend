import { Request, Response } from "express";

//event publishers
import * as productPublisher from './communication/publisher/product-B2B-publisher'


//repository
import AdminRepository from "../../infrastructure/repository/admin-repository";

//usecase
import CreateProduct from "../usecase/B2B/create-product";
import UpdateProduct from "../usecase/B2B/update-product";
import RemoveProduct from "../usecase/B2B/remove-product";
import ActivatePost from "../usecase/B2B/activate-product";



const repository = new AdminRepository()


// create new product -- post
export const createProduct = async (req: Request, res: Response) => {
    const dependencies = {
        createProduct: productPublisher.createNewProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// update product -- patch
export const updateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        updateProduct: productPublisher.updateProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


/** De activate product/post */
export const deactivateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        removeProduct: productPublisher.removeProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Activate user product || post */
export const activatePost = async(req : Request, res : Response) => {
    const dependencies = {
        activatePost : productPublisher.acitvateProduct,
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
