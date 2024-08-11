import IRepository from "../../../../infrastructure/interface/IRepository-services"


class FetchAllServices {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data:Input) {


        const products = await this.repository.fetchAllServiceByOwnerId(data)
        return products
        
    }

}


export default FetchAllServices

interface Input {
    ownerId: string, query: {
        category?: string, query?: string, subCategory?: string
    }
}


interface Dependencies {
    repository: IRepository
}