import StatusCode from "../../infrastructure/config/status-code"
import IRepository from "../../infrastructure/interface/IRepository"


class ProductRating {

    private rateProduct: any
    private repository: IRepository
    private fetchOrder: any

    constructor(dependencies: Dependencies) {
        this.rateProduct = dependencies.rateProduct
        this.repository = dependencies.repository
        this.fetchOrder = dependencies.fetchOrder
    }


    async execute(data: Input): Promise<Output> {


        // check input credentials
        const credentials = this.checkCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }

        try {


            // check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            //check  user purchased the product or not
            const order = this.fetchOrder({ userId: user._id, productId: data.productId })
            if (!order) return {
                response: { message: "You can only rate products you have purchased." },
                status: StatusCode.FORBIDDEN
            }



            // update rating
            const ratingParam = {
                userId: user._id, productId: data.productId,
                comment: data.comment, rating: data.rating
            }
            const updated: Output = await this.rateProduct(ratingParam)
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {

            return {
                response: { message: "Product rating failed" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }





    /**method for checking input credentials */
    checkCredentials(input: Input): CredentialCheckOutput {


        //check credentials exist or not
        if (!input.productId || !input.rating) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // check credential type
        if (typeof input.productId != 'string' || typeof input.rating != 'number') return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (input.comment && typeof input.comment != 'string') return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // check credential limits
        if (input.rating > 5 || input.rating < 1) return {
            message: "Rating should be between 1 and 5",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }
}




export default ProductRating


interface Input {
    productId: string,
    rating: number
    comment: string
    phone: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    rateProduct(data: { userId: string, productId: string }): Promise<Output>

    fetchOrder (data: { userId: string, productId: string; }) : Promise<any>

    repository: IRepository
}



interface CredentialCheckOutput {
    message: string
    status: StatusCode
    success: boolean
}
