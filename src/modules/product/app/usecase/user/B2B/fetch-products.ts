import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class FetchAllProducts {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(query: Input) {

        const products = await this.repository.fetchAllproducts(query)
        return products

    }
}

interface Input {
    limit?: number;
    category?: string;
    page_no?: number;
    query?: string;
    lowest_price?: number;
    highest_price?: number;
    sort?: 'price-low' | 'price-high' | 'latest'
}

interface Dependencies {
    repository: IRepository
}



export default FetchAllProducts