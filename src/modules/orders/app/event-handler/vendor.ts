
// Repository
import Repository from "../../infrastructure/repository/repository"


import * as productPublisher from '../publisher/product-publisher'

//usecase
import FetchOrders from "../usecase/vendor/fetch-orders"
import FetchAOrder from "../usecase/vendor/fetch-a-order"
import UpdateOrderStatus from "../usecase/vendor/update-order-status"


// Repository instance
const repository = new Repository()


/** Fetch orders with product ids with matching status*/
export const fetchOrdersWithIds = async (data:
    {
        productIds: string[], status: string, startDate?: string,
        endDate?: string, page_no?: number, limit?: number;
    }
): Promise<any> => {
    const dependencies = {
        repository
    }

    const interactor = new FetchOrders(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Fetch a order with orderId*/
export const fetchAOrder = async (orderId: string): Promise<any> => {
    const dependencies = {
        repository
    }
    const data = { orderId }

    const interactor = new FetchAOrder(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Update order status orderId*/
export const updateOrderStatus = async (data: { ownerId: string, orderId: string }): Promise<any> => {
    const dependencies = {
        repository,
        fetchProduct: productPublisher.fetchProduct
    }
    // const data = **{}

    const interactor = new UpdateOrderStatus(dependencies)
    const output = await interactor.execute(data)
    return output
}