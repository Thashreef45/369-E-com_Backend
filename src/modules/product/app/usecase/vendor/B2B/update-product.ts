import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class UpdateProduct {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {
        try {

            //check category is exist or not 
            const isCatgoryExist = await this.repository.findCategory(data.categoryId)
            if (!isCatgoryExist) return {
                response: { message: "Category not exist" },
                status: StatusCode.NOT_FOUND
            }


            // fetch product
            const product = await this.repository.findProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }


            //check user authenticated or not
            if (data.ownerId != product.ownerId) return {
                response: { message: "Access denied" },
                status: StatusCode.FORBIDDEN
            }


            //update product
            const updated = await this.repository.updateProduct(data)

            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {
            return {
                response: { message: "Error updating product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}


export default UpdateProduct



interface Input {
    productId: string,
    name: string,
    description: string,
    thumbnail: string,
    images: string[],
    categoryId: string,
    subCategoryId: string,
    ownerId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}