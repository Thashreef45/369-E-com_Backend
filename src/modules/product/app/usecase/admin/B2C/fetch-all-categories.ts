import IRepository from "../../../../infrastructure/interface/IRepository"


class FetchAllCategory {
    private repository : IRepository
    constructor(dependencies:Dependencies){
        this.repository =  dependencies.repository
    }

    async execute(){
        
        const data = await this.repository.fetchAllCategories()
        return await data
        
    }
}


interface Dependencies {
    repository : IRepository
}

export default FetchAllCategory