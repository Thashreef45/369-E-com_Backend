import * as eventPublisher from '../../../../../product/app/handler/event-handlers/admin-B2B'
// import StatusCode from '../../../../infrastructure/config/staus-code'


export const createNewProduct = async (data: {
    name: string,
    description: string,
    price: number,
    thumbnail: string,
    images: string[]
    categoryId: string,
    ownerId: string
}): Promise<any> => {

    const response = await eventPublisher.createProduct(data)
    return response
}


export const updateProduct = async (data: {
    productId: string,
    name: string,
    description: string,
    price: number,
    thumbnail: string,
    images: string[],
    categoryId: string,
    ownerId: string
}): Promise<any> => {

    const response = await eventPublisher.updateProduct(data)
    return response
}

// interface Output {
//     response: { message: string },
//     status: StatusCode
// }


/** De activate post/product */
export const removeProduct = async (data: {
    productId: string,
    ownerId: string
}): Promise<any> => {

    const response = await eventPublisher.removeProduct(data)
    return response
}


/** Activate post/product */
export const acitvateProduct = async (data: {
    productId: string,
    ownerId: string
}): Promise<any> => {

    const response = await eventPublisher.activatePost(data)
    return response
}