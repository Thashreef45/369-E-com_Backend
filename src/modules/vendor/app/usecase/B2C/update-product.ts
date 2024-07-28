
import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class UpdateProduct {

    private repository: IRepository
    private updateProduct

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.updateProduct = dependencies.updateProduct
    }


    async execute(data: Input): Promise<Output> {


        //check credentials
        const credentials = this.credentialCheck(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }
        

        try {


            // fetch vendor data
            const vendor = this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor not found" },
                status: StatusCode.NOT_FOUND
            }


            // create new product
            const updated: Output = await this.updateProduct({ ...data, ownerId: vendor._id })
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {

            return {
                response: { message: "Error creating product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    // method for input credential checking 
    credentialCheck(data: Input): { success: boolean, message: string, status: StatusCode } {
        if (!data.productId || !data.name || !data.description || !data.price || !data.images ||
            !data.thumbnail || !data.stock || !data.categoryId || data.subCategoryId
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.stock < 25) return {
            message: "Stock cannot be less than 25",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // success full
        return { success: true, message: "", status: StatusCode.OK, }
    }
}

export default UpdateProduct



interface Input {

    email: string
    name: string
    description: string
    price: number
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string,
    subCategoryId: string,
    productId : string
}


interface Output {
    response: { message: string, data?: {} },
    status: StatusCode
}


interface Dependencies {

    repository: IRepository
    updateProduct(data: Input & { ownerId: string, isAdmin: boolean }): Promise<Output>
    // createToken(email: string): string
}