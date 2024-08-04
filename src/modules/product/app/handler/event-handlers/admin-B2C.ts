//repository
import repository from '../../../infrastructure/repository/repository-B2C'

//usecase
import CreateProduct from '../../usecase/admin/B2C/create-product'
import CreateCategory from '../../usecase/admin/B2C/create-category'
import CreateSubCategory from '../../usecase/admin/B2C/create-subcategory'
import FetchAllCategory from '../../usecase/admin/B2C/fetch-all-categories'
import GetAllProducts from '../../usecase/admin/B2C/get-all-products'
import GetAProduct from '../../usecase/admin/B2C/get-a-product'
import UpdateProduct from '../../usecase/admin/B2C/update-a-product'
// import FetchAdminProducts from '../../usecase/admin/B2C/fetch-admin-products'

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


// get all admin products || filter by query
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
    productId: string, name: string ,description: string,actualPrice: number ,price: number,
    offer: boolean,images: string[] ,thumbnail: string, stock: number ,categoryId: string ,
    subCategoryId: string , ownerId : string}) => {

    // const data = data

    const dependencies = {
        repository: productRepository
    }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}

