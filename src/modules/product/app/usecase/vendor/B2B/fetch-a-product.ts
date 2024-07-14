import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class GetAProduct {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {
        
        try {

            // product fetching
            const product = await this.repository.findProduct(data.id)
            if (!product) return { // null  -- product not found
                response: { message: "Product not found"},
                status: StatusCode.NOT_FOUND
            };
            else return { // product found
                response: { message: "Success", product },
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

export default GetAProduct



interface Input {
    id: string
}

interface Output {
    response: { message: string, product?: {} },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}