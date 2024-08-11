import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"


class UpdateService {

    private repository: IRepository
    constructor(dependencies: Dependencies) { }

    async execute(data: Input): Promise<Output> {

        try {

            const service = await this.repository.fetchAServiceById(data.serviceId)
            if (!service) return {
                response: { message: "Service not found" },
                status: StatusCode.NOT_FOUND
            }

            //check ownership   *authentic owner or not
            if (String(service.ownerId) != String(data.ownerId)) return {
                response: { message: "You are not authorized to update this service" },
                status: StatusCode.UNAUTHORIZED
            }


            //check category 
            const category = await this.repository.fetchCategoryById(data.categoryId)
            if (!category) return {
                response: { message: "Category not found" },
                status: StatusCode.NOT_FOUND
            }

            //check sub-category
            const subCategoryExist = this.#checkSubCategory(category.subcategories, data.subcategoryId)
            if (!subCategoryExist) return {
                response: { message: "Sub-Category not found" },
                status: StatusCode.NOT_FOUND
            }

            // check service with same name exist or not
            const nameExist = await this.repository.fetchAServiceByName(data.name)
            if (nameExist) return {
                response: { message: "Service with same name already exist" },
                status: StatusCode.CONFLICT
            }

            //update
            const updated = await this.repository.updateService(data)
            return {
                response : { message : "Success"},
                status : StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating service" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    /** Method will check sub-category exist or not */
    #checkSubCategory(subcategories: { _id: string }[], subCategoryId: string): boolean {

        for (let i = 0; i < subcategories.length; i++) {
            if (subcategories[i]._id == subCategoryId) return true
        } return false
    }
}

export default UpdateService


interface Input {
    serviceId: string, name: string, description: string, thumbnail: string,
    images: string[], categoryId: string, subcategoryId: string, ownerId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}