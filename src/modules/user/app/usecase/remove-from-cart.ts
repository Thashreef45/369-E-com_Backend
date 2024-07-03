import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class DeletFromCart {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {


        // check input credentials
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        

        try {

            //check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }



            //check that product exist in cart
            const productExist = this.checkCart(data.productId, user.cart)
            if (!productExist) return {
                response: { message: 'Product not found in cart' },
                status: StatusCode.NOT_FOUND
            }


            const response = await this.repository.removeFromCart(data.phone, data.productId)
            // response
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Erro removing product from cart" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    // checking that productId exist or not in cart
    checkCart(productID: string, cart: { productID: string }[]): boolean {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID == productID) return true
        } return false
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


