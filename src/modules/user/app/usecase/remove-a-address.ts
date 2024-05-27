import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class DeleteAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // todo : checks pending notfound , not updated

        const response = await this.repository.removeAddress(data.phone,data.addressId)
        // if(!response) {}
        // response,
        return {
            response: { message: "Address removed" },
            status: StatusCode.OK
        }
    }

}

export default DeleteAddress


interface Input {
    phone: string,
    addressId: string,
}

interface Dependencies {
    repository: IRepository
}


