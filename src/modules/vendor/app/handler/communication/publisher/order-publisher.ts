import * as orderConsumer from '../../../../../orders/app/event-handler/vendor'


/** fetch orders with productIds,with order status */
export const fetchOrdersWithIds = async (data:
    {
        productIds: string[], status: string, startDate?: string,
        endDate?: string, page_no?: number, limit?: number;
    }
): Promise<any> => {

    const output = await orderConsumer.fetchOrdersWithIds(data)
    return output
}



/** fetch order with orderId */
export const fetchOrder = async (orderId: string): Promise<any> => {

    const output = await orderConsumer.fetchAOrder(orderId)
    return output
}


/** update order status with orderId and product ownerId */
export const updateOrderStatus = async (data: { ownerId: string, orderId: string }): Promise<any> => {

    const output = await orderConsumer.updateOrderStatus(data)
    return output

}