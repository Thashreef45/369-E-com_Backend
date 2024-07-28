import IRepository from "../../../infrastructure/interface/IRepository"



/** Not for common use */
class FetchDeliveredOrder {

    private repository : IRepository
    constructor(dependencies : Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data:Input) {

        const order = await this.repository.fetchADeliveredOrder(data)
        return order

    }

}


export default FetchDeliveredOrder


interface Input {
    userId: string,
    productId: string
}

interface Dependencies {
    repository : IRepository
}