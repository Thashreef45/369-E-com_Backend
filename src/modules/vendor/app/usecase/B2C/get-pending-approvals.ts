import IRepository from "../../../infrastructure/interface/IRepository"


class FetchVendorApprovals {

    private repository :IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(): Promise<any> {

        const vendors = await this.repository.fetchPendingApprovals()
        return vendors
        
    }

}


export default FetchVendorApprovals

interface Dependencies {
    repository : IRepository
}