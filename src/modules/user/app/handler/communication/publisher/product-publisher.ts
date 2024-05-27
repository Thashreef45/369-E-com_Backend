import * as productPublisher from '../../../../../product/app/handler/event-handlers/user'

export const getProductsById = async (productIds: string[]) => {
    const response = await productPublisher.getProducts(productIds)
    return response
}


// fetch all products
export const getProducts = async () => {
    const response = await productPublisher.getAllProducts()
    return response
}


//fetch a product
export const getProduct = async () => {
    const response = await productPublisher.getProduct
    return response
}

