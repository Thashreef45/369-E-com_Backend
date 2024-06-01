import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class UpdateAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // check user exist or not
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }
        }


        // check address exist or not
        const addressExist = this.checkAddress(user.address, data.addressId)
        if (!addressExist) return {
            response: { message: "Address not found" },
            status: StatusCode.NOT_FOUND
        }


        //update the address
        const response = await this.repository.updateAddress(data.phone, data.addressId, data.address)
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }



    // check address exist or not
    private checkAddress(address: any[], id: string): boolean {
        for (let i = 0; i < address.length; i++) {
            if (address[i]._id == id) return true
        } return false
    }

}

export default UpdateAddress


interface Input {
    phone: string,
    addressId: string,
    address: {
        name: string,
        address: string,
        phone: string,
        pin: string
    }
}

interface Dependencies {
    repository: IRepository
}


