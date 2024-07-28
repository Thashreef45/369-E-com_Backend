import { Request, Response } from "express"


import * as productPublisher from '../handler/communication/publisher/B2B-product-publisher'
import FetchCategories from "../usecase/B2B-fetch-categories"
import responseHandler from "./response-handler"



// fetch all products || filter by queries
export const getProducts = async (req: Request, res: Response) => {

    // const query = req.query
    // const dependencies = {
    //     getAllProducts: productPublisher.getProducts
    // }

    // const interactor = new GetAllProducts(dependencies)
    // const output = await interactor.execute(query)
    // responseHandler(req, res, output)
}




/** fetch a product */
export const fetchProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.params.productId
    }
    const dependencies = {
        getProduct: productPublisher.getProduct
    }

    // const interactor = new GetProduct(dependencies)
    // const output = await interactor.execute(data)
    // responseHandler(req, res, output)
}




/** fetch all categories */
export const fetchAllCategories = async (req: Request, res: Response) => {

    const dependencies = {
        getCategories: productPublisher.getAllCategories
    }

    const interactor = new FetchCategories(dependencies)
    const output = await interactor.execute()
    responseHandler(req, res, output)
}