import StatusCode from '../../infrastructure/config/staus-code'

class GetProduct {

    private getProduct

    constructor(dependencies: Dependencies) {
        this.getProduct = dependencies.getProduct
    }

    async execute(data:Input) : Promise<Output>  {

        
        if (!data.productID) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        // fetch a product
        const product = await this.getProduct(data.productID)
        console.log(product,'rp')

        if(!product) return {
            response: { message: "Product not found"},
            status: StatusCode.NOT_FOUND
        }

        //succesfull response
        return {
            response: { message: "Success", data: product },
            status: StatusCode.OK
        }
    }
}

export default GetProduct


interface Dependencies {
    getProduct(productID:string): Promise<any> //todo:implementations of interface
}

interface Input {
    productID : string
}

interface Output {
    response : {message:string , data ?:any},
    status : StatusCode
}

