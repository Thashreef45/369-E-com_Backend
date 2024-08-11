import productRepository from "../../../infrastructure/repository/repository-B2B"


//event publishers
import * as adminPublisher from '../../handler/publishers/admin-publisher'
import * as vendorPublisher from '../../handler/publishers/vendor-publisher'

//user case
import FetchAllCategories from "../../usecase/user/B2B/fetch-categories"
import FetchAllProducts from "../../usecase/user/B2B/fetch-products"
import FetchAProduct from "../../usecase/user/B2B/get-a-product"



const repository = new productRepository()


//fetch all proudcts
export const getProducts = async (query: any): Promise<any> => {
    const data = { ...query }
    const dependencies = {
        repository: repository
    }
    const interactor = new FetchAllProducts(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get a product by id
export const getProduct = async (productId: string): Promise<any> => {
    const data = { productId }
    const dependencies = {
        repository: repository,
        fetchVendorWithId: vendorPublisher.fetchVendor,
        fetchAdminWithId: adminPublisher.FetchAdmin
    }
    const interactor = new FetchAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



export const fetchCategories = async (): Promise<any> => {
    const dependencies = {
        repository: repository
    }
    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    return output
}