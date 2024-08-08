import * as orderConsumer from '../../../../../orders/app/event-handler/admin'


/** Fetch orders with product ids with matching query*/
export const fetchOrdersWithIds = async (data:
    {
        productIds: string[], status: string, startDate?: string,
        endDate?: string, page_no?: number, limit?: number;
    }
): Promise<any> => {
    const response = await orderConsumer.fetchOrdersWithIds(data)
    return response
}



/** Fetch orders with product ids with matching query*/
export const fetchOrder = async (orderId: string): Promise<any> => {
    const response = await orderConsumer.fetchAOrder(orderId)
    return response
}




/** update order status with orderId and product ownerId */
export const updateOrderStatus = async (data: {
    ownerId: string;
    orderId: string;
}): Promise<any> => {

    const output = await orderConsumer.updateOrderStatus(data)
    return output
}