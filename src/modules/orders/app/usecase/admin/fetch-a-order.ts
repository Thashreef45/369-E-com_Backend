import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAOrder {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<any> {

        const order = await this.repository.fetchOrder({orderId:data.orderId})
        return order

    }
}


export default FetchAOrder

interface Input {
    orderId: string
}

interface Dependencies {
    repository: IRepository
}


