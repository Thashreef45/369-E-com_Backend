import * as productPublisher from '../../../../../product/app/handler/event-handlers/user'

export const getProductsById = async (productIds: string[]) => {
    const response = await productPublisher.getProducts(productIds)
    return response
}


// fetch all products
export const getProducts = async (query: any) => {
    const response = await productPublisher.getAllProducts(query)
    return response
}



//fetch a product
export const getProduct = async (productId: string) => {
    const response = await productPublisher.getProduct(productId)
    return response
}

export const getCategories = async (): Promise<any> => {

    const response = await productPublisher.getAllCategories
    return response
}



//checkout cart
export const checkoutCart = async (
    data: { productId: string, quantity: number }[]
) => {

    const response = await productPublisher.checkoutUserCart(data)
    return response
}



// product rating
export const rateProduct = async (data: { userId: string, productId: string,comment: string,rating: number}) => {

    const response = await productPublisher.rateProduct(data)
    return response
}

