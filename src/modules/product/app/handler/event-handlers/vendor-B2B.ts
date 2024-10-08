// ------------------   CONSUMER FOR VENDOR MODULE ---------------------

//repository
import MarketPlaceRepository from "../../../infrastructure/repository/repository-B2B"

//usecase
import CreateProduct from "../../usecase/vendor/B2B/create-product"
import GetAProduct from "../../usecase/vendor/B2B/fetch-a-product"
// import FetchAllPosts from "../../usecase/vendor/B2B/fetch-user-posts"
import RemoveProduct from "../../usecase/vendor/B2B/remove-product"
import UpdateProduct from "../../usecase/vendor/B2B/update-product"
import ActivatePost from "../../usecase/vendor/B2B/activate-post"
import FetchAllProducts from "../../usecase/vendor/B2B/fetch-all-products"


// B2B Repository instance
const repository = new MarketPlaceRepository()



// create product
export const createProduct = async (data:
    {
        name: string, description: string, thumbnail: string, images: string[]
        categoryId: string, subCategoryId: string, ownerId: string
    }
) => {
    data = data // ----

    const dependencies = {
        repository: repository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// fetch a product
export const getProduct = async (id: string) => {

    const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// update product 
export const updateProduct = async (data:
    {
        productId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subCategoryId: string, ownerId: string
    }
) => {

    // const data = { id }
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

/** Fetch all vendor products  * active = true/false */
export const fetchVendorProducts = async (data: { ownerId: string, active?: boolean | undefined }) => {

    const params = {
        ownerId: data.ownerId,
        active: data.active //
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllProducts(dependencies)
    const output = await interactor.execute(params)
    return output
}



export const activateProduct = async (data: { ownerId: string, productId: string }) => {

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
