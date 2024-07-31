import IRepository from "../../../../infrastructure/interface/IRepository-B2B";


class FetchAProduct {

    private repository : IRepository
    constructor(dependencies : Dependencies){
        this.repository  = dependencies.repository
    }

    async execute(data : Input) : Promise<any>{
    
        const product = this.repository.fetchProuct(data.productId)
        return product

    }
}

export default FetchAProduct


interface Input{
    productId : string
}


interface Dependencies {
    repository : IRepository 
}