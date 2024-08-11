//repository
import repository from '../../../infrastructure/repository/repository-B2C'

//usecase
import GetProducts from "../../usecase/user/B2C/get-products"
import GetAllProducts from '../../usecase/user/B2C/get-all-products'
import GetAProduct from '../../usecase/user/B2C/get-a-product'
import CheckoutUserCart from '../../usecase/user/B2C/checkout-cart'
import FetchAllCategories from '../../usecase/user/B2C/fetch-all-categories'
import RateProduct from '../../usecase/user/B2C/rate-product'
import FetchFeedbacks from '../../usecase/user/B2C/fetch-feedbacks'

const productRepository = new repository()


// get products by ids          --**cartdata/wishlist
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


// get product feedbacks
export const getProductFeedbacks = async (data: { productId: string, page_no?: number, limit?: number }): Promise<any> => {
    const dependencies = {
        repository: productRepository
    }
    const interactor = new FetchFeedbacks(dependencies)
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


