import StatusCode from "../../../infrastructure/config/staus-code"


class GetProduct {

    private getProduct
    constructor(dependencies: Dependencies) {
        this.getProduct = dependencies.getProduct
    }

    async execute(data: Input): Promise<Output> {


        // check input credentials
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }
        

        try {

            // fetch product
            const product = await this.getProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }

            return {
                response: { message: "Success", data: product },
                status: StatusCode.OK
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
    getProduct(productID: string): Promise<any> //todo:implementations of interface
}

interface Input {
    productId: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

