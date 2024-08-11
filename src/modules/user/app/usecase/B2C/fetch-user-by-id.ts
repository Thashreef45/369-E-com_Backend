import IRepository from '../../../infrastructure/interface/IRepository'


class FetchUserById {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        const user = await this.repository.findById(data.userId)
        return user
        
    }
}


export default FetchUserById


interface Input {
    userId : string
}

interface Dependencies {
    repository: IRepository
}