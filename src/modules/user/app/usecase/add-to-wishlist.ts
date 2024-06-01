import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddToWishlist {

    private repository: IRepository
    private getProduct 

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProduct = dependencies.getProduct
    }

    async execute(data: Input) {


        // check user exist or not 
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }


        //if already exist in wishlist
        const alreadyNotExist = this.checkWishlist(user?.wishlist , data.productId)
        if(!alreadyNotExist) return {
            response: { message: "Product already exist" },
            status: StatusCode.CONFLICT
        }



        //check that it is a valid product
        const isExist = await this.getProduct(data.productId)
        if(isExist) return {
            response: { message: "Product not found" },
            status: StatusCode.NOT_FOUND
        }



        // update wishlist
        const response = await this.repository.addToWishlist(data.phone, data.productId)

        // response todo : pending with 404 , 400 (not updated)
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }


    // method to check product already exist in wishlist 
    private checkWishlist (wishlist:string[], productID:string):boolean {
        for(let i = 0 ; i < wishlist.length ; i++){
            if(wishlist[i] == productID) return false
        }return true
    }

}

export default AddToWishlist


interface Input {
    phone: string,
    productId: string,
}

interface Dependencies {
    getProduct(productId: string): any
    repository: IRepository
}


