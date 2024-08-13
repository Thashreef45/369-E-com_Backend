import * as vendorConsumer from '../../../../../product/app/handler/event-handlers/vendor-B2B'


// create product 
export const createProduct = async (data:
    {
        name: string, description: string, thumbnail: string, images: string[]
        categoryId: string, subCategoryId: string, ownerId: string
    }
) => {

    const response = await vendorConsumer.createProduct(data)
    return response
}


//fetch product with id 
export const getProduct = async (id: string) => {

    const response = await vendorConsumer.getProduct(id)
    return response
}



// update a product
export const updateProduct = async (data:
    {
        productId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subCategoryId: string, ownerId: string
    }
) => {

    const response = await vendorConsumer.updateProduct(data)
    return response
}


//remove product -- (remvoe post/inactivate)
export const removeProduct = async (data: any) => {

    const response = await vendorConsumer.removeProduct(data)
    return response
}



// fetch all post
export const fetchVendorProducts = async (data: { ownerId: string, active?: boolean | undefined }) => {

    const response = await vendorConsumer.fetchVendorProducts(data)
    return response
}



// acitivate post
export const activateProduct = async (data: { ownerId: string, productId: string }) => {

    const response = await vendorConsumer.activateProduct(data)
    return response
}
