import * as eventPublisher from '../../../../../product/app/handler/event-handlers/admin'


// publisher for creating a category
export const createNewCategory = async (name: string, description: string) => {

    const result = await eventPublisher.createCategory({ name, description })
    return result
}


// publisher for creating a subcategory
export const createNewSubCategory = async (categoryId: string, name: string, description: string) => {

    const result = await eventPublisher.createSubCategory({ categoryId, name, description })
    return result
}

// publisher for fetching all categories along with its sub-category
export const getAllCategories = async () => {

    const result = await eventPublisher.fetchAllCategory()
    return result
}


// publisher for creating a product
export const createNewProduct = async (
    name: String,
    description: String,
    price: Number,
    images: [String],
    thumbnail: String,
    stock: Number,
    categoryId : String,
    subCategoryId : String
) => {

    const result = await eventPublisher.createProduct({name,description,price,images,thumbnail,stock,categoryId,subCategoryId})
    return result
}


// fetch all products
export const getProducts = async (query:any) => {
    const response = await eventPublisher.getAllProducts(query)
    return response
}


