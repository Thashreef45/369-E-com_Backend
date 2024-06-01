import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddNewAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        //check user exist or not
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }
        }


        // add new address
        const response = await this.repository.addNewAddress(data.phone,data.address)

        // response todo: updated , not updated 
        return {
            response: { message: "Success" },
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


