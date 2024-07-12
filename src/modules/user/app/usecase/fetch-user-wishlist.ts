import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class FetchWishlist {

    private repository: IRepository
    private getProducts

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProducts = dependencies.getProducts
    }

    async execute(data: Input) {


        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }



        // return empty arry if nothing in user wishlist
        if (!user?.wishlist?.length) return {
            response: { message: "Success", data: [] },
            status: StatusCode.OK
        }



        // fetch datas of that products
        const cartData = await this.getProducts(user.wishlist)

        // response
        return {
            response: { message: "Success", data: cartData },
            status: StatusCode.OK
        }
    }


}

export default FetchWishlist


interface Input {
    phone: string,
}

interface Dependencies {
    repository: IRepository
    getProducts(idArray: string[]): Promise<any[]> //todo:implementations of interface
}

interface Cart {
    productId: string
    quantity: number
}

