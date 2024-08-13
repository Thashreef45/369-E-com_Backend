import * as eventPublisher from '../../../../../product/app/handler/event-handlers/admin-B2B'
// import StatusCode from '../../../../infrastructure/config/staus-code'

/** create new category */
export const createNewCategory = async (data: {
    name: string,
    description: string,
}): Promise<any> => {

    const response = await eventPublisher.createCategory(data)
    return response
}


/** Update category */
export const updateCategory = async (data: {
    categoryId: string
    name: string,
    description: string,
}): Promise<any> => {

    const response = await eventPublisher.updateCategory(data)
    return response
}



/** create new sub-category */
export const createSubCategory = async (data: {
    categoryId: string
    name: string,
    description: string,
}): Promise<any> => {

    const response = await eventPublisher.createSubCategory(data)
    return response
}


/** Update sub-category */
export const updateSubCategory = async (data: {
    subCategoryId: string
    name: string,
    description: string,
}): Promise<any> => {

    const response = await eventPublisher.updateSubCategory(data)
    return response
}


/** Update sub-category */
export const fetchCategories = async (): Promise<any> => {

    const response = await eventPublisher.fetchCategories()
    return response
}




export const createNewProduct = async (data: {
    name: string,
    description: string,
    thumbnail: string,
    images: string[]
    categoryId: string,

    subCategoryId: string

    ownerId: string
}): Promise<any> => {

    const response = await eventPublisher.createProduct(data)
    return response
}


export const updateProduct = async (data:
    {
        productId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subCategoryId: string, ownerId: string
    }
): Promise<any> => {

    const response = await eventPublisher.updateProduct(data)
    return response
}


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



/**Fetch admin products */
export const fetchAdminProducts = async (ownerId: string): Promise<any> => {

    const response = await eventPublisher.fetchAdminproducts(ownerId)
    return response
}




/**Fetch admin products */
export const fetchAProduct = async (productId: string): Promise<any> => {

    const response = await eventPublisher.fetchAProduct(productId)
    return response
}