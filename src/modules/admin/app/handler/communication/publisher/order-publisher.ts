import * as orderConsumer from '../../../../../orders/app/event-handler/admin'


/** Fetch orders with product ids with matching query*/
export const fetchOrdersWithIds = async(productIds:string[],query:string) => {
    const response = await orderConsumer.fetchOrdersWithIds(productIds,query)
    return response
}