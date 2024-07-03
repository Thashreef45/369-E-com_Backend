import StatusCode from "../../infrastructure/config/staus-code"

class CreateProduct {

    private createProduct

    constructor(dependencies: Dependencies) {
        this.createProduct = dependencies.createProduct
    }

    async execute(data: Input): Promise<Output> {


        // validating the input
        const validInput = this.CheckInputData(data)
        if (!validInput) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            // create product
            const updated: Output = await this.createProduct(
                data.name, data.description, data.price,
                data.images, data.thumbnail, data.stock,
                data.categoryId, data.subCategoryId
            )

            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {
            
            return {
                response: { message: "Product creating failed" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    // checks any missing the input credentials.returns true/false
    private CheckInputData(data: Input) {
        if (!data.name || !data.description ||
            !data.price || !data.images.length || !data.thumbnail ||
            !data.stock || !data.categoryId || !data.subCategoryId
        ) return false
        return true
    }
}


export default CreateProduct

interface Dependencies {
    createProduct(name: string, description: string, price: number
        , images: string[], thumbnail: string, stock: number,
        categoryId: string, subCategoryId: string
    ): any
}

interface Input {
    name: string
    description: string
    price: number
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string,
    subCategoryId: string,
}

interface Output {
    response: { message: string },
    status: StatusCode
}