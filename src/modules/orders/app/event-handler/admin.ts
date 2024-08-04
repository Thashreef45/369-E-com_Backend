//Repository
import Repository from "../../infrastructure/repository/repository"


//usecase
import FetchAOrder from "../usecase/admin/fetch-a-order"
import FetchOrders from "../usecase/admin/fetch-orders"


//Repository instance
const repository = new Repository()


/** Fetch orders with product ids with matching status*/
export const fetchOrdersWithIds = async(productIds:string[],status:string): Promise<any> => {
    
    const dependencies = {
        repository
    }
    const data = {
        productIds,status
    }
    
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