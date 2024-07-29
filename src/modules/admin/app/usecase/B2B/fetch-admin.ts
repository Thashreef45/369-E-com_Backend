import IRepository from "../../../infrastructure/interface/IRepository"



class FetchAdmin {
    
    private repository : IRepository
    constructor(dependencies : Dependencies){
        this.repository = dependencies.repository
    }

    async execute(data : Input) {
        const admin = await this.repository.findById(data.id)
        return admin
    }
}


export default FetchAdmin



interface Input {
    id : string
}


interface Dependencies {
    repository : IRepository
}