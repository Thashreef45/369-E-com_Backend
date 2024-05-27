import StatusCode from '../../infrastructure/config/staus-code'

class GetAllProducts {

    private getAllProducts

    constructor(dependencies: Dependencies) {
        this.getAllProducts = dependencies.getAllProducts
    }

    async execute() {

        // fetch products
        const products = await this.getAllProducts()

        // response
        return {
            response: { message: "Success", data: products },
            status: StatusCode.OK
        }
    }
}

export default GetAllProducts


interface Dependencies {
    getAllProducts(): Promise<any[]> //todo:implementations of interface
}


