import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class RemoveFromWishlist {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {


            // check user exist or not 
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            //check product exist in wishlist
            const isExist = this.checkWishlist(user.wishlist, data.productId)
            if (!isExist) return {
                response: { message: "Product not exist on wishlist" },
                status: StatusCode.NOT_FOUND
            }



            //remove from wishlist
            const response = await this.repository.removeFromWishlist(data.phone, data.productId)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }


        } catch (error) {

            return {
                response: { message: "Error removing product" },
                status: StatusCode.BAD_REQUEST
            }
        }
    }


    private checkWishlist(wishlist: string[], productID: string): boolean {
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i] == productID) return true
        } return false
    }
}

export default RemoveFromWishlist


interface Input {
    phone: string,
    productId: string,
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


