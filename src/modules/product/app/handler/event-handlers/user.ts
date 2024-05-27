//repository
import repository from '../../../infrastructure/repository/product-repository'

//usecase
import GetProducts from "../../usecase/user/get-products"
import GetAllProducts from '../../usecase/user/get-all-products'
import GetAProduct from '../../usecase/user/get-a-product'

const productRepository = new repository()


// get products by ids
export const getProducts = async (data: string[]) => {
    data = data // ----
    const dependencies = {
        repository: productRepository
    }
    const interactor = new GetProducts(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get a product by id
export const getProduct = async (productId: string) => {
    const data = { id : productId}
    const dependencies = {
        repository: productRepository
    }
    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get all products
export const getAllProducts = async () => {
    const dependencies = {
        repository: productRepository
    }
    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute()
    return output
}

