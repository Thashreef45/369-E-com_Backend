import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class DeletFromCart {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // todo : checks pending notfound , not updated

        const response = await this.repository.removeFromCart(data.phone,data.productId)
        // response
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }

}

export default DeletFromCart


interface Input {
    phone: string,
    productId: string,
}

interface Dependencies {
    repository: IRepository
}


