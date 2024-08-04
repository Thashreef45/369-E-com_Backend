import * as productConsumer from '../../../../../product/app/handler/event-handlers/vendor-B2C'


// create product 
export const createProduct = async (data: any): Promise<any> => {

    const response = await productConsumer.createProduct(data)
    return response

}


/** fetch product with id  */
export const getProduct = async (id: string): Promise<any> => {

    const response = await productConsumer.getProduct(id)
    return response
}



// update a product
export const updateProduct = async (data: any): Promise<any> => {

    const response = await productConsumer.updateProduct(data)
    return response
}




// fetch all post
export const getAllProducts = async (data: { ownerId: string, query: any }) => {

    const response = await productConsumer.fetchAllproducts(data)
    return response
}


