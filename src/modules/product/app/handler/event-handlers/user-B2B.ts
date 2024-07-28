import productRepository from "../../../infrastructure/repository/repository-B2B"


//user case
import FetchAllCategories from "../../usecase/user/B2B-fetch-categories"



const repository = new productRepository()

// get products by ids
export const getProducts = async (data: string[]): Promise<any> => {
    data = data // ----
    const dependencies = {
        repository: repository
    }
    // const interactor = new GetProducts(dependencies)
    // const output = await interactor.execute(data)
    // return output
}


// get a product by id
export const getProduct = async (productId: string): Promise<any> => {
    const data = { id: productId }
    const dependencies = {
        repository: repository
    }
    // const interactor = new GetAProduct(dependencies)
    // const output = await interactor.execute(data)
    // return output
}



export const fetchCategories = async (): Promise<any> => {
    const dependencies = {
        repository: repository
    }
    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    return output
}