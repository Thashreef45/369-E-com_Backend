import IRepository from "../../../infrastructure/interface/IRepository"



class FetchOrder {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input) {

        const order = await this.repository.fetchOrder(data)
        return order

    }

}


export default FetchOrder


interface Input {
    orderId: string
}

interface Dependencies {
    repository: IRepository
}