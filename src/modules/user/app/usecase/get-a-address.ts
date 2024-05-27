import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class GetAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // db data fetch
        const user = await this.repository.findByPhone(data.phone)

        if (!user) {
            return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }
        }

        const address = this.fetchAddress(user.address, data.addressId)
        if(!address) {
            return {
                response: { message: 'No address found' },
                status: StatusCode.NOT_FOUND
            }
        }

        // response
        return {
            response: { message: "Success", data: address},
            status: StatusCode.OK
        }
    }


    private fetchAddress(addressArray: Address[], addressId) {
        const address = addressArray.filter((x: Address) => x._id == addressId)
        if (address.length) return address[0]
        else return null
    }

}

export default GetAddress


interface Input {
    phone: string,
    addressId: string
}

interface Dependencies {
    repository: IRepository
}

interface Address {
    _id: String
    name: String,
    address: String,
    phone: String,
    pin: String,
}