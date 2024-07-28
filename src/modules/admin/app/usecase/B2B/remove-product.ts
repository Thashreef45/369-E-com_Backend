import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"




class RemoveProduct {

    private removeProduct 
    private repository : IRepository

    constructor(dependencies: Dependencies) {
        this.removeProduct = dependencies.removeProduct
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check credentials
            if(!data.email || !data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }


            //fetch admin
            const admin = await this.repository.findByEmail(data.email)
            if (!admin) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            //remove
            const output: Output = await this.removeProduct({ownerId:admin._id,productId:data.productId})
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
    email: string
    productId: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    // fetchUser(phone: string): {}
    repository : IRepository
    removeProduct(data:{ownerId:string,productId:string}) : any
}