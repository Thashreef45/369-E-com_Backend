import StatusCode from "../../../infrastructure/config/staus-code"




class RemoveProduct {

    private fetchUser
    private removeProduct 
    constructor(dependencies: Dependencies) {
        this.fetchUser = dependencies.fetchUser
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check credentials
            if(!data.phone || !data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }


            //fetch user
            const user = await this.fetchUser(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            //remove
            const output: Output = await this.removeProduct({userId:user._id,productId:data.productId})
            return {
                response : output.response,
                status : output.status
            }

        } catch (error) {

            return {
                response: { message: "Error removing product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}


export default RemoveProduct



interface Input {
    phone: string
    productId: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    fetchUser(phone: string): {}
    removeProduct(data:{userId:string,productId:string}) : any
}