import MarketPlaceRepository from "../../../infrastructure/repository/repository-B2B"


//usecase
import CreateCategory from "../../usecase/admin/B2B/create-category"
import CreateProduct from "../../usecase/admin/B2B/create-product"

import RemoveProduct from "../../usecase/admin/B2B/remove-product"
import UpdateProduct from "../../usecase/admin/B2B/update-product"
import ActivatePost from "../../usecase/admin/B2B/activate-post"

import FetchAdminProducts from "../../usecase/admin/B2B/fetch-admin-products"
import FetchAProduct from "../../usecase/admin/B2B/fetch-a-product"
import CreateSubCategory from "../../usecase/admin/B2B/create-sub-category"
import UpdateCategory from '../../usecase/admin/B2B/update-category'
import UpdateSubCategory from "../../usecase/admin/B2B/update-sub-category"
import FetchCategories from "../../usecase/admin/B2B/fetch-all-categories"



// B2B Repository instance
const repository = new MarketPlaceRepository()


/** Create new category */
export const createCategory = async (data: { name: string, description: string, }) => {

    const dependencies = {
        repository: repository
    }
    const params = {
        name: data.name,
        description: data.description
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(params)
    return output
}

//////////////////////////////////////////////////////////////////////////
/** Create new sub-category */
export const createSubCategory = async (data:
    { categoryId: string, name: string, description: string, }
) => {

    const dependencies = {
        repository: repository
    }
    const params = {
        categoryId: data.categoryId,
        name: data.name,
        description: data.description
    }

    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(params)
    return output
}



/** Update a category */
export const updateCategory = async (data:
    { categoryId: string, name: string, description: string, }
) => {

    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Update a sub-category */
export const updateSubCategory = async (data:
    { subCategoryId: string, name: string, description: string, }
) => {

    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateSubCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** fetch categories */
export const fetchCategories = async () => {

    const dependencies = {
        repository: repository
    }

    const interactor = new FetchCategories(dependencies)
    const output = await interactor.execute()
    return output
}


//////////////////////////////////////////////////////////////////////////



// create product
export const createProduct = async (data: any) => {
    data = data // ----

    const dependencies = {
        repository: repository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// create product
export const updateProduct = async (data:
    {
        productId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subCategoryId: string, ownerId: string
    }
) => {
    // data = data // ----

    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



export const removeProduct = async (data: { ownerId: string, productId: string }) => {

    // const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}




export const activatePost = async (data: { ownerId: string, productId: string }) => {
    const params = {
        ownerId: data.ownerId,
        productId: data.productId
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new ActivatePost(dependencies)
    const output = await interactor.execute(params)
    return output
}



/** Fetch admin products */
export const fetchAdminproducts = async (ownerId: string) => {
    const params = {
        ownerId
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAdminProducts(dependencies)
    const output = await interactor.execute(params)
    return output
}




/** Fetch a product with productId */
export const fetchAProduct = async (productId: string) => {
    const params = {
        productId
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAProduct(dependencies)
    const output = await interactor.execute(params)
    return output
}
