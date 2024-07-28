import IRepository from "../../../../infrastructure/interface/IRepository"


class GetAProduct {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data : Input){
        
        const products = await this.repository.getProduct(data.id)
        return products
        
    }
}

export default GetAProduct


interface Dependencies {
    repository: IRepository
}

interface Input {
    id : string
}