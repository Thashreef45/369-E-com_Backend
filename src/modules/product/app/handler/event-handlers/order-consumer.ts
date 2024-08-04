
import productRepository from "../../../infrastructure/repository/repository-B2C"

import GetAProduct from "../../usecase/vendor/B2C/fetch-a-product"

const repository = new productRepository()


/** Fetch a product with productId */
export const fetchProduct = async (productId: string): Promise<any> => {
    
    const data = { id : productId } //**

    const dependencies = {
        repository
    }

    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}