import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class UpdateProduct {

    private repository: IRepository
    private updateProduct

    constructor(dependencies: Dependencies) {
        this.updateProduct = dependencies.updateProduct
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        //checking the credentials
        if (!data.name || !data.description || !data.price ||
            !data.thumbnail || !data.categoryId
        ) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            // fetch user
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Venodr account not found" },
                status: StatusCode.NOT_FOUND
            }

            const updated: Output = await this.updateProduct({ ...data, ownerId: vendor._id })
            return {
                response: updated.response,
                status: updated.status
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
    name: string,
    description: string,
    price: number,
    thumbnail: string,
    images: string[],
    categoryId: string,

    productId: string,
    email: string,
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    updateProduct(data: Input & { ownerId: string }): Promise<Output>
}