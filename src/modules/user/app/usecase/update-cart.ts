import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class UpdateCartItem {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        if (data.count < 0 ) {
            return {
                response: { message: `Product count cannot be less than zero `},
                status: StatusCode.BAD_REQUEST
            }
        }

        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }

        const response = await this.repository.updateCartProductCount(
            data.phone,data.productId,data.count
        )
        // response
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }

}

export default UpdateCartItem


interface Input {
    phone: string,
    productId: string,
    count: number
}

interface Dependencies {
    repository: IRepository
}


