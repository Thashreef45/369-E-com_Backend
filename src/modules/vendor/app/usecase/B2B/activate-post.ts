import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ActivatePost {

    private activatePost
    private repository : IRepository

    constructor(dependencies: Dependencies) {
        this.activatePost = dependencies.activatePost
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        // credential check
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            // fetch user
            // const user = await this.fetchUser(data.phone)
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
            const updated: Output = await this.activatePost(param)
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


export default ActivatePost


interface Input {
    email: string
    productId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    activatePost(param: { ownerId: string, productId: string })
    repository : IRepository
}