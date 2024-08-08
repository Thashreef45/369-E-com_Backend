import IRepository from "../../../infrastructure/interface/IRepository"


class FetchOrders {
    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<any> {

        const orders = this.repository.fetchOrdersWithProductIds(data)
        return orders
    }
}


export default FetchOrders

interface Input {
    productIds: string[]
    status: string

    startDate?: string;
    endDate?: string;
    page_no?: number;
    limit?: number;
}

interface Dependencies {
    repository: IRepository
}


