import StatusCode from "../../infrastructure/config/staus-code"



class UpdateProduct {

    private updateProduct

    constructor(dependencies: Dependencies) {
        this.updateProduct = dependencies.updateProduct
    }


    async execute(data: Input): Promise<Output> {


        // check input credentials
        const credentials = this.checkCredentials(data)
        if (!credentials) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        //update product
        const updated: Output = await this.updateProduct(data)
        return {
            response: updated.response,
            status: updated.status
        }

    }



    // method to check input credentials
    checkCredentials(data: Input): boolean {
        if (!data.productId || !data.name || !data.price || !data.stock
            || !data.description || !data.images || !data.thumbnail ||
            !data.categoryId || !data.subCategoryId
        ) return false
        return true
    }
}






export default UpdateProduct




interface Input {
    productId: string,
    name: string
    description: string
    price: number
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string
    subCategoryId: string
}

interface Output {
    response: { message: String },
    status: StatusCode
}


interface Dependencies {
    updateProduct(data: any): any
}
