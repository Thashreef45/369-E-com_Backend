import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository-B2B"


class ActivatePost {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {
        try {
            // fetch product
            const product = await this.repository.findProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }

            // check authentic or not
            if (data.userId != product.userId) return {
                response: { message: "Access denied" },
                status: StatusCode.FORBIDDEN
            }


            // check conflict
            if (product.active) return {
                response: { message: "Product is already active" },
                status: StatusCode.CONFLICT
            }


            // update
            const update = this.repository.activateProduct(data.productId)
            return {
                response : {message : "Success"},
                status : StatusCode.OK
            }

        } catch (error) {
            return {
                response: { message: "Error updating products" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}


export default ActivatePost


interface Input {
    userId: string,
    productId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}