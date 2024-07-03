import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class RemoveFromWishlist {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // check user exist or not 
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }


        const isExist = this.checkWishlist(user.wishlist,data.productId)
        if(!isExist) return {
            response: { message: "Product not exist on wishlist" },
            status: StatusCode.NOT_FOUND
        }


        const response = await this.repository.removeFromWishlist(data.phone, data.productId)
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }


    private checkWishlist (wishlist : string[], productID:string) {
        for(let i=0 ;  i < wishlist.length ; i++){
            if(wishlist[i] == productID) return true
        } return false
    }
}

export default RemoveFromWishlist


interface Input {
    phone: string,
    productId: string,
}

interface Dependencies {
    repository: IRepository
}


