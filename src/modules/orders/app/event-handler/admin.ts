import Repository from "../../infrastructure/repository/repository"
import FetchOrders from "../usecase/admin/fetch-orders"



const repository = new Repository()

/** Fetch orders with product ids with matching query*/
export const fetchOrdersWithIds = async(productIds:string[],query:string): Promise<any> => {
    
    const dependencies = {
        repository
    }
    const data = {
        productIds,query
    }
    
    const interactor = new FetchOrders(dependencies)
    const output = await interactor.execute(data)
    return output
}