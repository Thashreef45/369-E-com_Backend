import StatusCode from '../../infrastructure/config/staus-code'

class GetProduct {

    private fetchProduct

    constructor(dependencies: Dependencies) {
        this.fetchProduct = dependencies.fetchProduct
    }

    async execute(data: Input): Promise<Output> {


        // credential check
        if (!data.productId) return {
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

export default GetProduct


interface Dependencies {
    fetchProduct(productId: string): Promise<any>
}

interface Input {
    productId: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

