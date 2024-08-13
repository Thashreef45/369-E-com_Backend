import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ActivateProduct {

    private activateProduct: (param: { ownerId: string, productId: string }) => Promise<Output>
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.activateProduct = dependencies.activateProduct
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        // credential check
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }


            // params for publisher
            const param = {
                ownerId: vendor._id, productId: data.productId
            }

            // publish
            const updated = await this.activateProduct(param)
            // response
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


export default ActivateProduct


interface Input {
    email: string
    productId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    activateProduct(param: { ownerId: string, productId: string }): Promise<Output>
    repository: IRepository
}