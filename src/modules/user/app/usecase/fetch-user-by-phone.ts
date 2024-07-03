import IRepository from '../../infrastructure/interface/IRepository'


class FetchUserByPhone {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        const user = await this.repository.findByPhone(data.phone)
        return user
        
    }
}


export default FetchUserByPhone


interface Input {
    phone : string
}

interface Dependencies {
    repository: IRepository
}