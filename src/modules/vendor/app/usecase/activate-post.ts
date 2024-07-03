import StatusCode from "../../infrastructure/config/staus-code"


class ActivatePost {

    private fetchUser
    private activatePost

    constructor(dependencies: Dependencies) {
        this.fetchUser = dependencies.fetchUser
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
            const user = await this.fetchUser(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            // params for publisher
            const param = {
                userId: user._id, productId: data.productId
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
    phone: string
    productId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchUser(userId: string): any
    activatePost(param: { userId: string, productId: string })
}