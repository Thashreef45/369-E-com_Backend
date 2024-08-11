import IRepository from "../../../../infrastructure/interface/IRepository"


class GetProducts {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data:string[]){
        const products = await this.repository.getProducts(data)
        return products
    }
}

export default GetProducts


interface Dependencies {
    repository: IRepository
}