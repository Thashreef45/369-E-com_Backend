import * as vendorConsumer from '../../../../../product/app/handler/event-handlers/vendor-B2C'


// create product 
export const createProduct = async (data: any): Promise<any> => {

    const response = await vendorConsumer.createProduct(data)
    return response

}


//fetch product with id 
export const getProduct = async (id: string) => {

    // const response = await vendorConsumer.getProduct(id)
    // return response
}



// update a product
export const updateProduct = async (data) => {

    // const response = await vendorConsumer.updateProduct(data)
    // return response
}


// fetch all post
export const fetchAllPost = async (data: { userId: string, query?: boolean | undefined }) => {

    // const response = await vendorConsumer.fetchAllPosts(data)
    // return response
}


