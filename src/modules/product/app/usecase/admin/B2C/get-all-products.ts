import IRepository from "../../../../infrastructure/interface/IRepository"


class GetAllProducts {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(query :any) {


        // Query to inject ----

        const products = await this.repository.fetchAdminProducts(query)
        return products
        
    }



    // Query for product fetching
    // private createQuery(queries:any) {

        //query structure
        // {
        //     "limit": "10",
        //     "category": "ObjectId("6d038j472j88dx89j")",
        //     "page_no": "2",
        //     "query": "laptop",
        //     "lowest_price": "100",
        //     "highest_price": "2000",
        //     "rating": "4",
        //     "sort": "latest"
        // }
    // }
}

export default GetAllProducts


interface Dependencies {
    repository: IRepository
}