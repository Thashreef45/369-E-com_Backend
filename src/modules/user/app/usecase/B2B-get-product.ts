import StatusCode from "../../infrastructure/config/staus-code"


/** Fetch a B2B prdouct with productId */
class FetchAProduct {

    private getProduct: any
    constructor(dependencies: Dependencies) {
        this.getProduct = dependencies.getProduct
    }


    async execute(data: Input): Promise<Output> {

        try {

            //check input credentials
            if (!data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }

            // fetch product
            const product: Output = await this.getProduct(data.productId)
            return {
                response: product.response,
                status: product.status
            }

        } catch (error) {

            return {
                response: { message: "Error fetching product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }



    productMapper(data: Product) {

    }
}


export default FetchAProduct


interface Input {
    productId: string
}


interface Output {
    response: { message: string, data?: Product },
    status: StatusCode
}


interface Dependencies {
    getProduct(productId: string): Promise<any>
}



interface Product {
    name: string
    description: string
    price: number
    thumbnail: string
    images: string[]
    categoryId: string
    enquiry: {
        whatsapp: String,
        phone: String
    }
}