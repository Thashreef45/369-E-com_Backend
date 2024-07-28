import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"




class RemoveProduct {

    private removeProduct 
    private repository : IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.removeProduct = dependencies.removeProduct
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check credentials
            if(!data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }


            //fetch user
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }


            //remove
            const output: Output = await this.removeProduct({ownerId:vendor._id,productId:data.productId})
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
    removeProduct(data:{ownerId:string,productId:string}) : Promise<Output>
    repository : IRepository
}