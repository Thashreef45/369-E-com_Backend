

import IRepository from "../../../infrastructure/interface/IRepository"


class FetchUserOrders {

    private repository : IRepository
    constructor(dependencies : Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data:Input) {

        const order = await this.repository.fetchUserOrders(data)
        return order
        
    }

}


export default FetchUserOrders


interface Input {
    userId: string,
}

interface Dependencies {
    repository : IRepository
}