import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchOrders {
    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        const orders = this.repository.fetchOrdersWithProductIds(data)
        return orders
        return {
            response: { message: "Success", data: orders },
            status: StatusCode.OK
        }
    }
}


export default FetchOrders

interface Input {
    productIds: string[]
    query: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


