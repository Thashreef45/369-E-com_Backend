import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class AddToCart {

    private repository: IRepository
    private getProduct

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProduct = dependencies.getProduct
    }

    async execute(data: Input) {

        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }


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


        // update the product in user cart
        const response = await this.repository.addToCart(data.phone, data.productId)
        // response
        return {
            response: { message: "Success" },
            status: StatusCode.OK
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

interface Dependencies {
    getProduct(productID: string): any
    repository: IRepository
}


