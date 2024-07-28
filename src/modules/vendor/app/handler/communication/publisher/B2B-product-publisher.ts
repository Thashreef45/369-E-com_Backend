import * as vendorConsumer from '../../../../../product/app/handler/event-handlers/vendor-B2B'


// create product 
export const createProduct = async (data : any) => {

    const response = await vendorConsumer.createProduct(data)
    return response
}


//fetch product with id 
export const getProduct = async (id:string) => {

    const response = await vendorConsumer.getProduct(id)
    return response
}



// update a product
export const updateProduct = async (data :any) => {

    const response = await vendorConsumer.updateProduct(data)
    return response
}


//remove product -- (remvoe post/inactivate)
export const removeProduct = async (data : any) => {

    const response = await vendorConsumer.removeProduct(data)
    return response
}



// fetch all post
export const fetchAllPost = async (data:{ownerId:string,query?:boolean|undefined}) => {

    const response = await vendorConsumer.fetchAllPosts(data)
    return response
}



// acitivate post
export const activatePost = async (data:{ownerId:string,productId:string}) => {

    const response = await vendorConsumer.activatePost(data)
    return response
}
