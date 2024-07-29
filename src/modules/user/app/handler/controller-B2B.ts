import { Request, Response } from "express"


// product publisher
import * as productPublisher from '../handler/communication/publisher/B2B-product-publisher'

//response handler
import responseHandler from "./response-handler"

//usecase
import FetchCategories from "../usecase/B2B-fetch-categories"
import FetchAProduct from "../usecase/B2B-get-product"
import FetchAllProducts from "../usecase/B2B-fetch-products"



// fetch all products || filter by queries
export const getProducts = async (req: Request, res: Response) => {

    const query = req.query
    const dependencies = {
        getAllProducts: productPublisher.getProducts
    }

    const interactor = new FetchAllProducts(dependencies)
    const output = await interactor.execute(query)
    responseHandler(req, res, output)


}




/** fetch a product */
export const fetchProduct = async (req: Request, res: Response) => {

    const data = {
        productId: req.params.productId
    }
    const dependencies = {
        getProduct: productPublisher.getProduct
    }

    const interactor = new FetchAProduct(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
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