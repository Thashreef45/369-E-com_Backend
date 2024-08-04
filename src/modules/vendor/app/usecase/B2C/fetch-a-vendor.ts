import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAVendor {

    private repository :IRepository
    
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data:Input): Promise<any> {

        const vendor = await this.repository.fetchVendorWithId(data.vendorId)
        return vendor
        
    }

}


export default FetchAVendor


interface Input {
    vendorId : string
}

interface Dependencies {
    repository : IRepository
}