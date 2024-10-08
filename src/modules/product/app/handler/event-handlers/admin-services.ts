//Repository
import ServiceRepository from "../../../infrastructure/repository/repository-services"


//usecase
import CreateCategory from "../../usecase/admin/service/create-category"
import CreateSubCategory from "../../usecase/admin/service/create-sub-category"
import UpdateCategory from "../../usecase/admin/service/update-category"
import UpdateSubCategory from "../../usecase/admin/service/update-sub-category"
import FetchAllCategories from "../../usecase/admin/service/fetch-all-categories"

import CreateService from "../../usecase/admin/service/create-service"
import FetchAService from "../../usecase/admin/service/fetch-a-service"
import UpdateService from "../../usecase/admin/service/update-service"
import ActivateService from "../../usecase/admin/service/activate-service"
import DeActivateService from "../../usecase/admin/service/de-activate-service"
import FetchAllServices from "../../usecase/admin/service/fetch-all-services"


//Repository instance
const repository = new ServiceRepository()


/** create category */
export const createCategory = async (data: { name: string, description: string }): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** Update category */
export const updateCategory = async (data: { categoryId: string, name: string, description: string }): Promise<any> => {
    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** create new sub-category */
export const createSubCategory = async (data: { categoryId: string, name: string, description: string }): Promise<any> => {
    const dependencies = {
        repository: repository
    }

    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** Update sub-category */
export const updateSubCategory = async (data: { subCategoryId: string, name: string, description: string }): Promise<any> => {
    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateSubCategory(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** Fetch all categories */
export const fetchAllCategories = async (): Promise<any> => {
    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute()
    return output
}


/** create new Service */
export const createService = async (data:
    {
        name: string, description: string, thumbnail: string, images: string[],
        categoryId: string, subcategoryId: string, ownerId: string
    }
): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new CreateService(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** create new Service */
export const updateService = async (data:
    {
        serviceId: string, name: string, description: string, thumbnail: string,
        images: string[], categoryId: string, subcategoryId: string, ownerId: string
    }
): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new UpdateService(dependencies)
    const output = await interactor.execute(data)
    return output
}





/** Fetch a Service with id */
export const fetchAService = async (serviceId: string): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const data = {serviceId}

    const interactor = new FetchAService(dependencies)
    const output = await interactor.execute(data)
    return output
}


/** De-Activate Service */
export const deactivateService = async (data:{serviceId: string,ownerId: string}): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new DeActivateService(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Re-Activate Service */
export const activateService = async (data:{serviceId: string,ownerId: string}): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new ActivateService(dependencies)
    const output = await interactor.execute(data)
    return output
}



// fetchAllServices
/** Fetch all Service */
export const fetchAllServices = async (data:
    {
        ownerId: string, query: {
            category?: string, query?: string, subCategory?: string
        }
    }
): Promise<any> => {

    const dependencies = {
        repository: repository
    }

    const interactor = new FetchAllServices(dependencies)
    const output = await interactor.execute(data)
    return output
}