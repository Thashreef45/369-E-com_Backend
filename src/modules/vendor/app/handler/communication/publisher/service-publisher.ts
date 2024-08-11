import * as serviceConsumer from '../../../../../product/app/handler/event-handlers/admin-services'



export const fetchAllCategories = async (): Promise<any> => {
    const response = await serviceConsumer.fetchAllCategories()
    return response
}


/** create new service*/
export const createService = async (data:
    {
        name: string, description: string, thumbnail: string, images: string[],
        categoryId: string, subcategoryId: string, ownerId: string
    }
): Promise<any> => {
    const response = await serviceConsumer.createService(data)
    return response
}



/** update a service*/
export const updateService = async (data:
    {
        serviceId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subcategoryId: string, ownerId: string
    }
): Promise<any> => {
    const response = await serviceConsumer.updateService(data)
    return response
}



/** fetch a service by id*/
export const fetchAService = async (serviceId: string): Promise<any> => {
    const response = await serviceConsumer.fetchAService(serviceId)
    return response
}



/** de-activate a service*/
export const deactivateService = async (data: { serviceId: string, ownerId: string }): Promise<any> => {
    const response = await serviceConsumer.deactivateService(data)
    return response
}



/** activate a service*/
export const activateService = async (data: { serviceId: string, ownerId: string }): Promise<any> => {
    const response = await serviceConsumer.activateService(data)
    return response
}


/** fetch all admin service || by query *optional */
export const fetchAllServices = async (data:
    {
        ownerId: string, query: {
            category?: string, query?: string, subCategory?: string
        }
    }
): Promise<any> => {
    const response = await serviceConsumer.fetchAllServices(data)
    return response
}