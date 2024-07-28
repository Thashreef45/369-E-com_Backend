import StatusCode from "../../infrastructure/config/staus-code";
import IRepository from "../../infrastructure/interface/IRepository";


class CartCheckout {

    //declarations
    private repository: IRepository

    private getProductsById: (productIds: string[]) => Promise<any>

    private checkoutCart: (data: Cart[]) => Promise<{ message: string, success: boolean, status: StatusCode }>

    private createOrder: (data: {
        products: { productId: string, quantity: number, price: number }[]
        userId: string; addressId: string; cod: boolean
    }) => Promise<any>


    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository

        this.getProductsById = dependencies.getProductsById

        this.checkoutCart = dependencies.checkoutCart
        this.createOrder = dependencies.createOrder
    }



    async execute(data: Input): Promise<Output> {


        //check input credentials
        if (data.addressId || typeof data.cod != 'boolean') return {
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


            // check address exist or not
            const isExist = this.checkAddress(user.address, data.addressId)
            if (!isExist) return {
                response: { message: 'Address not found' },
                status: StatusCode.NOT_FOUND
            }


            //check cart is empty or not
            if (!user?.cart?.length) return {
                response: { message: "Cart is empty" },
                status: StatusCode.BAD_REQUEST
            }


            //update product stock
            const updated = await this.checkoutCart(user.cart) // product publisher
            if (!updated.success) return {
                response: { message: updated.message },
                status: updated.status
            }


            //create array of product ids
            const productIds = this.createProductIds(user.cart)


            // fetch cart product data
            const products = await this.getProductsById(productIds)



            // create order
            const orderParams = this.createOrderParams(user?.cart, products, user._id, data.addressId, data.cod)
            const orderCreated:Output = await this.createOrder(orderParams) // order publisher
            return {
                response: orderCreated.response,
                status: orderCreated.status
            }


        } catch (error) {

            return {
                response: { message: "Error during cart checkout" },
                status: StatusCode.INTERNAL_ERROR
            }
        }



    }



    /**method for checking address exist or not */
    private checkAddress(address: { _id: string, active: boolean }[], id: string): boolean {
        for (let i = 0; i < address.length; i++) {
            if (address[i]._id == id && address[i].active) return true
        } return false
    }


    /** Method for creating array of product Ids */
    private createProductIds(cart: { prductId: string }[]) {
        return cart.map(item => item.prductId)
    }



    /** Method fro creating params for order publisher */
    createOrderParams(
        cart: { productId: string, quantity: number }[],
        products: { _id: string, price: number }[],
        userId: string, addressId: string, cod: boolean
    ): {
        products: { productId: string, quantity: number, price: number }[]
        userId: string; addressId: string; cod: boolean
    } {

        const obj: any = {
            userId, addressId, cod, products: []
        }


        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (String(cart[i].productId) == String(products[j]._id)) {

                    obj.products.push(
                        {
                            productId: products[j]._id,
                            quantity: cart[i].quantity,
                            price: products[j].price
                        }
                    )
                }
            }
        }

        return obj

    }
}


export default CartCheckout

interface Input {
    phone: string,
    addressId: string
    cod: boolean
}

interface Output {
    response: { message: string },
    status: StatusCode
}


interface Cart {
    productId: string, quantity: number
}


interface Dependencies {

    repository: IRepository

    getProductsById(productIds: string[]): Promise<any>

    checkoutCart(data: Cart[]): Promise<{ message: string, success: boolean, status: StatusCode }>

    createOrder(data: {
        products: { productId: string, quantity: number, price: number }[]
        userId: string; addressId: string; cod: boolean
    }): Promise<any>
}