import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddNewAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // db data fetch
        //todo : checks pending for notfound , not updated 
        // const user = await this.repository.findByPhone(data.phone)
        // if (!user) {
        //     return {
        //         response: { message: 'User not found' },
        //         status: StatusCode.NOT_FOUND
        //     }
        // }

        const response = await this.repository.addNewAddress(data.phone,data.address)
        // response todo: updated , not updated , notfound
        return {
            response: { message: "Address added succesfully" },
            status: StatusCode.OK
        }
    }

}

export default AddNewAddress


interface Input {
    phone : string
    address : Address
}

interface Address {
    name: string,
    address: string,
    phone: string,
    pin: string
}

interface Dependencies {
    repository: IRepository
}


