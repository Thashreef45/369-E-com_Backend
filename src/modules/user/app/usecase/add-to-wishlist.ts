import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddToWishlist {

    private repository: IRepository
    private getProduct

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProduct = dependencies.getProduct
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


            //check that it is a valid product
            const isExist = await this.getProduct(data.productId)
            if (!isExist) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }


            //if already exist in wishlist
            const alreadyNotExist = this.checkWishlist(user?.wishlist, data.productId)
            if (!alreadyNotExist) return {
                response: { message: "Product already exist" },
                status: StatusCode.CONFLICT
            }


            // update wishlist
            const response = await this.repository.addToWishlist(data.phone, data.productId)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error adding product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    // method to check product already exist in wishlist 
    private checkWishlist(wishlist: string[], productID: string): boolean {
        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i] == productID) return false
        } return true
    }

}

export default AddToWishlist


interface Input {
    phone: string,
    productId: string,
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    getProduct(productId: string): any
    repository: IRepository
}


