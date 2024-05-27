import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddToWishlist {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        const response = await this.repository.addToWishlist(data.phone,data.productId)
        // response todo : pending with 404 , 400 (not updated)
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }

}

export default AddToWishlist


interface Input {
    phone: string,
    productId: string,
}

interface Dependencies {
    repository: IRepository
}


