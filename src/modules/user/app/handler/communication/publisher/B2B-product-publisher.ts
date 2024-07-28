import * as productPublisher from '../../../../../product/app/handler/event-handlers/user-B2B'


// fetch all products
export const getProducts = async (query: any) => {
    const response = await productPublisher.getProducts(query)
    return response
}



//fetch a product
export const getProduct = async (productId: string) => {
    const response = await productPublisher.getProduct(productId)
    return response
}


//fetch all categories
export const getAllCategories = async () => {
    const response = await productPublisher.fetchCategories()
    return response
}