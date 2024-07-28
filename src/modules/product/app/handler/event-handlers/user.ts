//repository
import repository from '../../../infrastructure/repository/repository-B2C'

//usecase
import GetProducts from "../../usecase/user/get-products"
import GetAllProducts from '../../usecase/user/get-all-products'
import GetAProduct from '../../usecase/user/get-a-product'
import CheckoutUserCart from '../../usecase/user/checkout-cart'
import FetchAllCategories from '../../usecase/user/fetch-all-categories'
import RateProduct from '../../usecase/user/rate-product'

const productRepository = new repository()


// get products by ids
export const getProducts = async (data: string[]): Promise<any> => {
    data = data // ----
    const dependencies = {
        repository: productRepository
    }
    const interactor = new GetProducts(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get a product by id
export const getProduct = async (productId: string): Promise<any> => {
    const data = { id: productId }
    const dependencies = {
        repository: productRepository
    }
    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get all products || filter by query
export const getAllProducts = async (query: any): Promise<any> => {
    const dependencies = {
        repository: productRepository
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute(query)
    return output
}


// fetch all categories
export const getAllCategories = async (): Promise<{}[]> => {
    const dependencies = {
        repository: productRepository
    }

    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    return output
}



// checkout user cart
export const checkoutUserCart = async (data: { productId: string, quantity: number }[]): Promise<any> => {
    const dependencies = {
        repository: productRepository
    }

    const interactor = new CheckoutUserCart(dependencies)
    const output = await interactor.execute(data)
    return output
}






// product rating 
export const rateProduct = async (data: {
    productId: string, userId: string,
    comment: string, rating: number
}): Promise<any> => {

    const dependencies = {
        repository: productRepository
    }

    const interactor = new RateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


