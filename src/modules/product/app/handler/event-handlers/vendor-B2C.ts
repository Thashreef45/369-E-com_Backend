

// repository
import ProductRepository from "../../../infrastructure/repository/product-repository"


// usecase
import CreateProduct from "../../usecase/vendor/B2C/create-product"



// Repository instance
const repository = new ProductRepository()




// ------------------------------------ HANDLER FUNCIONS -----------------------------------------


// create product
export const createProduct = async (data:any) => {

    data = data

    const dependencies = {
        repository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}



// // fetch a product
// export const getProduct = async (id:string) => {

//     const data = { id }
//     const dependencies = {
//         repository: repository
//     }

//     const interactor = new GetAProduct(dependencies)
//     const output = await interactor.execute(data)
//     return output
// }



// // update product 
// export const updateProduct = async (data:any) => {

//     // const data = { id }
//     const dependencies = {
//         repository: repository
//     }

//     const interactor = new UpdateProduct(dependencies)
//     const output = await interactor.execute(data)
//     return output
// }
