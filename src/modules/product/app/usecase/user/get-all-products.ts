import IRepository from "../../../infrastructure/interface/IRepository"


class GetAllProducts {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(){
        
        const products = await this.repository.getAllProducts()
        return products
    }
}

export default GetAllProducts


interface Dependencies {
    repository: IRepository
}