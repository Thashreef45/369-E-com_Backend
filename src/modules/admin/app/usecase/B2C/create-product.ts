import StatusCode from "../../../infrastructure/config/staus-code"

class CreateProduct {

    private createProduct

    constructor(dependencies: Dependencies) {
        this.createProduct = dependencies.createProduct
    }

    async execute(data: Input): Promise<Output> {


        // check input credentials
        const validInput = this.checkCredentials(data)
        if (!validInput.success) return {
            response: { message: validInput.message },
            status: validInput.status
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


    // method to check input credentials
    checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        // check input credentials
        if (!data.name || !data.price || !data.stock
            || !data.description || !data.images || !data.thumbnail ||
            !data.categoryId || !data.subCategoryId 
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: true
        }

        // check input credential type
        if (
            typeof data.name !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.price !== 'number' ||
            typeof data.categoryId !== 'string' ||
            typeof data.subCategoryId !== 'string' ||
            !Array.isArray(data.images) ||
            data.images.every(image => typeof image !== 'string') 
        ) return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if(data.stock < 25) return {
            message: "Stock should be more than 25",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
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