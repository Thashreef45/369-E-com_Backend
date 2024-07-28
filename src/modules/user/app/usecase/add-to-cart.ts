import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'
import { response } from 'express'

class AddToCart {

    private repository: IRepository
    private getProduct : any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProduct = dependencies.getProduct
    }

    async execute(data: Input): Promise<Output> {


        // check input credentials
        if (!data.productId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            //check user
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            // check cart limit
            if (user?.cart?.length == 10) return {
                response: { message: 'Cart limit reached. Cannot add more items.' },
                status: StatusCode.BAD_REQUEST
            }


            // check product already exist in cart
            const notInCart = this.CheckCart(user.cart, data.productId)
            if (!notInCart) return {
                response: { message: "Product already exist in cart" },
                status: StatusCode.CONFLICT
            }


            //fetching the product
            const isProductExist = await this.getProduct(data.productId)
            if (!isProductExist) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }


            //stock check
            if (!isProductExist.stock) return {
                response: { message: "Product not in stock" },
                status: StatusCode.CONFLICT
            }


            // update the product in user cart
            const response = await this.repository.addToCart(data.phone, data.productId)
            // response
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error adding to cart" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    //checks the user cart , is product already exist or not 
    private CheckCart(cart: { productId: string }[], productID: string) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == productID) return false
        } return true
    }

}

export default AddToCart


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


