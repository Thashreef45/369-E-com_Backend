import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class UpdateAddress {

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

        const response = await this.repository.updateAddress(data.phone,data.addressId,data.address)
        // const response = await this.repository.updateCartProductCount(
        //     data.phone,data.productId,data.count
        // )
        // response
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
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


