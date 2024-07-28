import StatusCode from "../../../../infrastructure/config/staus-code";
import IRepository from "../../../../infrastructure/interface/IRepository";



class UpdateProduct {


    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check that product exist or not
            const product = await this.repository.getProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }

            //check ownership
            if (String(product?.ownership?.ownerId) != String(data.ownerId)) return {
                response: { message: "Access denied" },
                status: StatusCode.UNAUTHORIZED
            }


            //check category
            const isCatgoryExist = this.repository.getCategoryById(data.categoryId)
            if (!isCatgoryExist) return {
                response: { message: "Category not exist" },
                status: StatusCode.NOT_FOUND
            }


            //check sub-category
            const valideSubCategory = this.checkCategory(isCatgoryExist?.subcategories, data.subCategoryId)
            if (!valideSubCategory) return {
                response: { message: "Sub-category not exist" },
                status: StatusCode.NOT_FOUND
            }


            //update product
            const update = await this.repository.updateProduct(data)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }


        } catch (error) {
            return {
                response: { message: 'Error updating product' },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    checkCategory(subcategories: string[], subCategoryId: string): boolean {
        return subcategories.includes(subCategoryId)
    }
}

export default UpdateProduct


interface Input {
    productId: string,
    name: string,
    description: string,
    price: number,
    actualPrice: number
    offer: boolean
    images: string[],
    thumbnail: string,
    stock: number,
    categoryId: string,
    subCategoryId: string
    ownerId: string
}


interface Output {
    response: { message: string }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}