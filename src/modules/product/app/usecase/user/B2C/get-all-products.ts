import IRepository from "../../../../infrastructure/interface/IRepository"


class GetAllProducts {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(query :Query) {


        const products = await this.repository.getAllProducts(query)

        return products
    }

}

export default GetAllProducts


interface Dependencies {
    repository: IRepository
}

interface Query {
    limit?: number;
    category?: string;
    sub_category?: string;
    page_no?: number;
    query?: string;
    lowest_price?: number;
    highest_price?: number;
    rating?: number;
    sort?: string;
}