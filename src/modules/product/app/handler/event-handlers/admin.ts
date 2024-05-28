//repository
import repository from '../../../infrastructure/repository/product-repository'

//usecase
import CreateProduct from '../../usecase/admin/create-product'
import CreateCategory from '../../usecase/admin/create-category'
import CreateSubCategory from '../../usecase/admin/create-subcategory'

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




// create product
export const createProduct = async (data) => {
    // data = data // ----

    const dependencies = {
        repository: productRepository
    }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    return output
}