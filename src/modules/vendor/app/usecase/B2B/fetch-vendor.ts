import IRepository from "../../../infrastructure/interface/IRepository"


class FetchVendor{

    private repository : IRepository
    constructor(dependencies : Dependencies){
        this.repository = dependencies.repository
    }

    async execute(data:Input){

        const vendor  = this.repository.fetchVendorWithId(data.id)
        return vendor
        
    }
}


export default FetchVendor

interface Input {
    id : string
}


interface Dependencies{
    repository : IRepository
}