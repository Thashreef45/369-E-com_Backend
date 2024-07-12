import StatusCode from "../../../infrastructure/config/staus-code"



class GetAProduct {

    private fetchProduct
    constructor(dependencies: Dependencies) {
        this.fetchProduct = dependencies.fetchProduct
    }


    async execute(data: Input): Promise<Output> {


        //check credentials
        if(data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            const output: Output = await this.fetchProduct(data.productId)
            return {
                response: output.response,
                status: output.status
            }

        } catch (error) {
            return {
                response: { message: "Error fetching product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}


export default GetAProduct



interface Input {
    productId: string
}

interface Output {
    response: { message: string, data?: {} },
    status: StatusCode
}
``
interface Dependencies {
    fetchProduct(productId: string)
}
