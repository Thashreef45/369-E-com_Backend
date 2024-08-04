
// repository
import ProductRepository from "../../../infrastructure/repository/repository-B2C"


// usecase
import GetAProduct from "../../usecase/vendor/B2C/fetch-a-product"
import CreateProduct from "../../usecase/vendor/B2C/create-product"
import UpdateProduct from "../../usecase/vendor/B2C/update-product"
import FetchAllProducts from "../../usecase/vendor/B2C/fetch-all-products"



// Repository instance
const repository = new ProductRepository()




// ------------------------------------ HANDLER FUNCIONS -----------------------------------------


// create product
export const createProduct = async (data: any) => {

    data = data

    const dependencies = {
        repository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// fetch a product
export const getProduct = async (id: string) => {
    const data = { id } //**

    const dependencies = {
        repository: repository
    }

    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}




// update product 
export const updateProduct = async (data:any) => {

    // const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}




/** Fetch all owner products */
export const fetchAllproducts = async (data:{ ownerId: string, query: any }) => {

    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllProducts(dependencies)
    const output = await interactor.execute(data)
    return output
}
