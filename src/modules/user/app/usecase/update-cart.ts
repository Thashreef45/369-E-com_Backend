import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class UpdateCartItem {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        //check input credentials
        if (!data.productId || data.count) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        if (data.count < 0) return {
            response: { message: `Product count cannot be less than zero ` },
            status: StatusCode.BAD_REQUEST
        }


        
        try {

            // check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            //check that product exist or not cart
            const productExistInCart = this.checkCartProduct(data.productId,user.cart)
            if(!productExistInCart) return {
                response: { message: 'Product not found in cart' },
                status: StatusCode.NOT_FOUND
            }


            //update cart
            const update = await this.repository.updateCartProductCount(
                data.phone, data.productId, data.count
            )
            // response
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating cart" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }

    checkCartProduct(productId: string, cart: {productId:string}[]) {
        for(let i = 0  ; i < cart.length ; i++){
            if(cart[i].productId == productId) return true
        }return false
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


