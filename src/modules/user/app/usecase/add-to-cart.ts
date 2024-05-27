import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddToCart {

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

        const response = await this.repository.addToCart(data.phone,data.productId)
        // response
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }

}

export default AddToCart


interface Input {
    phone: string,
    productId: string,
}

interface Dependencies {
    repository: IRepository
}


