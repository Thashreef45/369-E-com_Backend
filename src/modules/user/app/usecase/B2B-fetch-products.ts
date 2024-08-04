import StatusCode from "../../infrastructure/config/status-code";


class FetchAllProducts {

    private getAllProducts: (query: Input) => Promise<Product[]>

    constructor(dependencies: Dependencies) {
        this.getAllProducts = dependencies.getAllProducts
    }


    async execute(query: Input): Promise<Output> {

        try {
            const products = await this.getAllProducts(query)
            return {
                response: { message: "Success", data: products },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching products" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }
}



export default FetchAllProducts

interface Input {
    limit?: number;
    category?: string;
    page_no?: number;
    query?: string;
    lowest_price?: number;
    highest_price?: number;
    sort?: 'price-low' | 'price-high' | 'latest'
}

interface Output {
    response: { message: string, data?: Product[] },
    status: StatusCode
}


interface Dependencies {
    getAllProducts(query: Input): Promise<Product[]>
}


interface Product {
    name: string
    description: string
    price: number
    thumbnail: string
    categoryId: string
}


