import StatusCode from '../../../infrastructure/config/staus-code'

class GetAllProducts {

    private getAllProducts

    constructor(dependencies: Dependencies) {
        this.getAllProducts = dependencies.getAllProducts
    }

    async execute(query:any) : Promise<Output>  {

        // fetch products
        const products  = await this.getAllProducts(query)

        // response
        return {
            response: { message: "Success", data: products },
            status: StatusCode.OK
        }
    }
}

export default GetAllProducts


interface Dependencies {
    getAllProducts(query:any): Promise<any> //todo:implementations of interface
}

interface Output {
    response : {message:string , data :any},
    status : StatusCode
}

