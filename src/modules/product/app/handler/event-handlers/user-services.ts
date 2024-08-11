//Repository
import ServiceRepository from "../../../infrastructure/repository/repository-services"


//Event publisher
import * as vendorPublisher from '../publishers/vendor-publisher'
import * as adminPublisher from '../publishers/admin-publisher'



//usecase

import FetchAllCategories from "../../usecase/user/service/fetch-all-categories"

import FetchAService from "../../usecase/user/service/fetch-a-service"
import FetchAllServices from "../../usecase/user/service/fetch-all-services"


//Repository instance
const repository = new ServiceRepository()



/** Fetch all categories */
export const fetchAllCategories = async (): Promise<any> => {
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    return output
}



/** Fetch a Service with id */
export const fetchAService = async (serviceId: string): Promise<any> => {

    const dependencies = {
        repository: repository,
        fetchAdmin: adminPublisher.FetchAdmin,
        fetchVendor: vendorPublisher.fetchVendor,
    }

    const data = { serviceId }

    const interactor = new FetchAService(dependencies)
    const output = await interactor.execute(data)
    return output
}




/** Fetch all Service || Query filters */
export const fetchAllServices = async (data:
    {
        category?: string, subCategory?: string, query?: string,
        limit?: number, page_no?: number;
    }
): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllServices(dependencies)
    const output = await interactor.execute(data)
    return output
}