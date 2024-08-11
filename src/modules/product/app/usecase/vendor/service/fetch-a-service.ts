import IRepository from "../../../../infrastructure/interface/IRepository-services"


class FetchAService {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        const service = await this.repository.fetchAServiceById(data.serviceId)
        return service
        
    }
}

export default FetchAService


interface Input {
    serviceId: string
}


interface Dependencies {
    repository: IRepository
}