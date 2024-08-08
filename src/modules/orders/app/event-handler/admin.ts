//Repository
import Repository from "../../infrastructure/repository/repository"


//publishers
import * as productPublisher from '../publisher/product-publisher'


//usecase
import FetchAOrder from "../usecase/admin/fetch-a-order"
import FetchOrders from "../usecase/admin/fetch-orders"
import UpdateOrderStatus from "../usecase/admin/update-order-status"


//Repository instance
const repository = new Repository()


/** Fetch orders with product ids with matching status*/
export const fetchOrdersWithIds = async(data:{productIds:string[],status:string}): Promise<any> => {
    
    const dependencies = {
        repository
    }
    // const data = {
    //     productIds,status
    // }
    
    const interactor = new FetchOrders(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** Fetch orders with orderId*/
export const fetchAOrder = async(orderId:string): Promise<any> => {
    const dependencies = {
        repository
    }
    const data = {orderId}
    
    const interactor = new FetchAOrder(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Update order status orderId*/
export const updateOrderStatus = async(data: { ownerId: string, orderId: string }): Promise<any> => {
    const dependencies = {
        repository,
        fetchProduct : productPublisher.fetchProduct
    }
    // const data = **{}
    
    const interactor = new UpdateOrderStatus(dependencies)
    const output = await interactor.execute(data)
    return output
}


