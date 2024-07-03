//repository
import repository from '../../../infrastructure/repository/product-repository'

//usecase
import CreateProduct from '../../usecase/admin/create-product'
import CreateCategory from '../../usecase/admin/create-category'
import CreateSubCategory from '../../usecase/admin/create-subcategory'
import FetchAllCategory from '../../usecase/admin/fetch-all-categories'
import GetAllProducts from '../../usecase/admin/get-all-products'
import GetAProduct from '../../usecase/admin/get-a-product'
import UpdateProduct from '../../usecase/admin/update-a-product'

// repository instance
const productRepository = new repository()



// create category
export const createCategory = async (data: { name: string, description: string }) => {
    data = {
        name: data.name,
        description: data.description
    }
    const dependencies = {
        repository: productRepository
    }
    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}




// create sub-category
export const createSubCategory = async (data: { categoryId: string, name: string, description: string }) => {
    data = {
        categoryId: data.categoryId,
        name: data.name,
        description: data.description
    }
    const dependencies = {
        repository: productRepository
    }
    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}


// fetch all categories along with sub-category
export const fetchAllCategory = async () => {
    const dependencies = {
        repository: productRepository
    }
    const interactor = new FetchAllCategory(dependencies)
    const output = await interactor.execute() 
    return output
}




// create product
export const createProduct = async (data:any) => {
    // data = data // ----

    const dependencies = {
        repository: productRepository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}


// get all products || filter by query
export const getAllProducts = async (query:any) => {
    const dependencies = {
        repository: productRepository
    }

    const interactor = new GetAllProducts(dependencies)
    const output = await interactor.execute(query)
    return output
}



// fetch a product
export const getAProduct = async (productId:string) => {

    const data = {
        id : productId
    }
    const dependencies = {
        repository: productRepository
    }

    const interactor = new GetAProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}




// update a product
export const updateProduct = async (data:{
    productId: string, name: string ,description: string ,price: number ,images: string[] ,
    thumbnail: string, stock: number ,categoryId: string ,subCategoryId: string}) => {

    // const data = data

    const dependencies = {
        repository: productRepository
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}