//Repository
import ServiceRepository from "../../../infrastructure/repository/repository-services"


//usecase
import CreateCategory from "../../usecase/admin/service/create-category"
import CreateService from "../../usecase/admin/service/create-service"
import CreateSubCategory from "../../usecase/admin/service/create-sub-category"
import FetchAllCategories from "../../usecase/admin/service/fetch-all-categories"
import UpdateCategory from "../../usecase/admin/service/update-category"
import UpdateService from "../../usecase/admin/service/update-service"
import UpdateSubCategory from "../../usecase/admin/service/update-sub-category"


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