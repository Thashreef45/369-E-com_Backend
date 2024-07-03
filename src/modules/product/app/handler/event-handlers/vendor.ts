// ------------------   CONSUMER FOR VENDOR MODULE ---------------------

//repository
import MarketPlaceRepository from "../../../infrastructure/repository/market-place-repository"
import ActivatePost from "../../usecase/vendor/activate-post"

//usecase
import CreateProduct from "../../usecase/vendor/create-product"
import GetAProduct from "../../usecase/vendor/fetch-a-product"
import FetchAllPosts from "../../usecase/vendor/fetch-user-posts"
import RemoveProduct from "../../usecase/vendor/remove-product"
import UpdateProduct from "../../usecase/vendor/update-product"


// B2B Repository instance
const repository = new MarketPlaceRepository()



// create product
export const createProduct = async (data:any) => {
    data = data // ----

    const dependencies = {
        repository: repository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


// fetch a product
export const getProduct = async (id:string) => {

    const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// update product 
export const updateProduct = async (data:any) => {

    // const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


export const removeProduct = async (data:{userId:string,productId:string}) => {

    // const data = { id }
    const dependencies = {
        repository: repository
    }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


export const fetchAllPosts = async (data:{userId:string,query?:boolean|undefined}) => {

    const params = { 
        userId : data.userId,
        query : data.query
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllPosts(dependencies)
    const output = await interactor.execute(params)
    return output
}



export const activatePost = async (data:{userId:string,productId:string}) => {

    const params = {
        userId : data.userId,
        productId : data.productId
    }
    const dependencies = {
        repository: repository
    }

    const interactor = new ActivatePost(dependencies)
    const output = await interactor.execute(params)
    return output
}
