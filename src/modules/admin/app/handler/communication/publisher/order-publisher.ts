import * as orderConsumer from '../../../../../orders/app/event-handler/admin'


/** Fetch orders with product ids with matching query*/
export const fetchOrdersWithIds = async(productIds:string[],status:string): Promise<any> => {
    const response = await orderConsumer.fetchOrdersWithIds(productIds,status)
    return response
}



/** Fetch orders with product ids with matching query*/
export const fetchOrder = async(orderId :string) : Promise<any> => {
    const response = await orderConsumer.fetchAOrder(orderId)
    return response
}