import IRepository from "../../../../infrastructure/interface/IRepository";


class FetchAllProducts {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data : Input) {

        const products = await this.repository.fetchOwnerProducts(data)
        return products
        
    }
}

export default FetchAllProducts

interface Input {
    ownerId: string, query: any 
}

interface Dependencies {
    repository: IRepository
}