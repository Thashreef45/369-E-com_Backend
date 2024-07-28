import MarketPlaceRepository from "../../../infrastructure/repository/repository-B2B"
import ActivatePost from "../../usecase/admin/B2B/activate-post"


//usecase
import CreateProduct from "../../usecase/admin/B2B/create-product"
import RemoveProduct from "../../usecase/admin/B2B/remove-product"
import UpdateProduct from "../../usecase/admin/B2B/update-product"



// B2B Repository instance
const repository = new MarketPlaceRepository()



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
export const updateProduct = async (data: any) => {
    data = data // ----

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


// export const fetchAllPosts = async (data:{userId:string,query?:boolean|undefined}) => {

//     const params = { 
//         userId : data.userId,
//         query : data.query
//     }
//     const dependencies = {
//         repository: repository
//     }

//     const interactor = new FetchAllPosts(dependencies)
//     const output = await interactor.execute(params)
//     return output
// }
