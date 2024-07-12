import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddNewAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {

            
            // check credentials
            if (!data.address || !data.address.address || !data.address.name
                || !data.address.phone || data.address.pin
            ) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }


            //check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) {
                return {
                    response: { message: 'User not found' },
                    status: StatusCode.NOT_FOUND
                }
            }


            // add new address
            const response = await this.repository.addNewAddress(data.phone, data.address)
            // response todo: updated , not updated 

            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {
            return {
                response: { message: "Error adding new address" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }

}

export default AddNewAddress


interface Input {
    phone: string
    address: Address
}

interface Address {
    name: string,
    address: string,
    phone: string,
    pin: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


