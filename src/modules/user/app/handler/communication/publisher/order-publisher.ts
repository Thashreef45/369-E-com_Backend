import * as orderPublisher from '../../../../../orders/app/event-handler/user'



export const checkoutCart = async (data: {
    products: { productId: string, quantity: number, price: number }[]
    userId: string; addressId: string; cod: boolean
}
) => {
    const response = await orderPublisher.creatOrder(data)
    return response
}


/** Fetch a delivered order (not for common use)*/
export const fetchAOrder = async (data: { userId: string, productId: string }) => {

    const response = await orderPublisher.fetchAOrder(data)
    return response
}


/** Fetch a user orders  by userId*/
export const fetchOrders = async (userId: string): Promise<any> => {

    const response = await orderPublisher.fetchOrders(userId)
    return response
}


/** Fetch a user order  by orderId*/
export const fetchOrder = async (orderId: string): Promise<any> => {

    const response = await orderPublisher.fetchOrder(orderId)
    return response
}



/** Cancel a user order  by orderId*/
export const cancelOrder = async (data:{ orderId: string, userId: string }): Promise<any> => {

    const response = await orderPublisher.cancelOrder(data)
    return response
}