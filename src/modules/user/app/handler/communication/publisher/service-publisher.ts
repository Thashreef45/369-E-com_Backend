import * as serviceConsumer from '../../../../../product/app/handler/event-handlers/user-services'


/** Fetch all categories */
export const fetchAllCategories = async (): Promise<any> => {
    const response = await serviceConsumer.fetchAllCategories()
    return response
}



/** Fetch a Service with id */
export const fetchAService = async (serviceId: string): Promise<any> => {

    const response = await serviceConsumer.fetchAService(serviceId)
    return response
}




/** Fetch all Service */
export const fetchAllServices = async (queries:
    {
        category?: string, subCategory?: string, query?: string,
        limit?: number, page_no?: number;
    }
): Promise<any> => {

    const response = await serviceConsumer.fetchAllServices(queries)
    return response
}