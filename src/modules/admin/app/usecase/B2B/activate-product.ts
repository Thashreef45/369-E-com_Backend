import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ActivatePost {

    private repository: IRepository
    private activatePost: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.activatePost = dependencies.activatePost
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
            const admin = await this.repository.findByEmail(data.email)
            if (!admin) return {
                response: { message: "Admin account not found" },
                status: StatusCode.NOT_FOUND
            }


            // params for publisher
            const param = {
                ownerId: admin._id, productId: data.productId
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
    repository: IRepository
    activatePost(data: { ownerId: string, productId: string }): Promise<Output>
}