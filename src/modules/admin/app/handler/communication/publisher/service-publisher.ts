import * as serviceConsumer from '../../../../../product/app/handler/event-handlers/admin-services'


/** Create new category */
export const createCategory = async (data: { name: string, description: string }): Promise<any> => {
    const response = await serviceConsumer.createCategory(data)
    return response
}

/** Update existing category  */
export const updateCategory = async (data: { categoryId: string, name: string, description: string }): Promise<any> => {
    const response = await serviceConsumer.updateCategory(data)
    return response
}

export const createSubCategory = async (data: { categoryId: string, name: string, description: string }): Promise<any> => {
    const response = await serviceConsumer.createSubCategory(data)
    return response
}

export const updateSubCategory = async (data: { subCategoryId: string, name: string, description: string }): Promise<any> => {
    const response = await serviceConsumer.updateSubCategory(data)
    return response
}

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



/** create new service*/
export const updateService = async (data:
    {
        serviceId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subcategoryId: string, ownerId: string
    }
): Promise<any> => {
    const response = await serviceConsumer.updateService(data)
    return response
}