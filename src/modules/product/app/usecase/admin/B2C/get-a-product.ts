import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository"


class GetAProduct {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data : Input){
        
        // fetch product 
        const product = await this.repository.getProduct(data.id)
        if(!product) return {
            response : {message : "Product not found" } ,
            status : StatusCode.NOT_FOUND
        }

        return {
            response: { message: "Success", data: product },
            status: StatusCode.OK
        }
    }
}

export default GetAProduct


interface Dependencies {
    repository: IRepository
}

interface Input {
    id : string
}