/** ================= USER CONSUMER =================*/

import Repository from "../../infrastructure/repository/repository"
import CancelOrder from "../usecase/user/cancel-order"


//use case
import CheckoutCart from "../usecase/user/cart-checkout"
import FetchDeliveredOrder from "../usecase/user/fetch-a-delivered-order"
import FetchOrder from "../usecase/user/fetch-a-order"
import FetchUserOrders from "../usecase/user/fetch-user-orders"


const repository = new Repository()



/** Create order */
export const creatOrder = async (
    data:
        {
            products: { productId: string, quantity: number, price: number }[],
            userId: string, addressId: string, cod: boolean
        }
) => {

    const dependencies = {
        repository
    }

    const interactor = new CheckoutCart(dependencies)
    const output = await interactor.execute(data)
    return output
}




/** Fetch a delivered order  */
export const fetchAOrder = async (data: { userId: string, productId: string }) => {

    const dependencies = {
        repository: repository
    }

    const interactor = new FetchDeliveredOrder(dependencies)
    const output = await interactor.execute(data)
    return output

}



/** Fetch User Orders ( by userId) */
export const fetchOrders = async (userId: string) => {

    const dependencies = {
        repository: repository
    }

    const data = { userId }

    const interactor = new FetchUserOrders(dependencies)
    const output = await interactor.execute(data)
    return output

}


/** Fetch  Order (by orderId) */
export const fetchOrder = async (orderId: string) => {

    const dependencies = {
        repository: repository
    }

    const data = { orderId }

    const interactor = new FetchOrder(dependencies)
    const output = await interactor.execute(data)
    return output

}


/** Fetch  Order (by orderId) */
export const cancelOrder = async (data:{ orderId: string, userId: string }) => {

    const dependencies = {
        repository: repository
    }

    // const data = { orderId }

    const interactor = new CancelOrder(dependencies)
    const output = await interactor.execute(data)
    return output

}
