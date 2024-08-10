import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"


class CreateService {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {
            //check category
            const category = await this.repository.fetchCategoryById(data.categoryId)
            if (!category) return {
                response: { message: "Category not found" },
                status: StatusCode.NOT_FOUND
            }

            //check sub-category
            const subCategoryExist = this.#checkSubCategory(category?.subcategories, data.subcategoryId)
            if (!subCategoryExist) return {
                response: { message: "Sub-Category not found" },
                status: StatusCode.NOT_FOUND
            }

            //check service name already exist or not
            const serviceExist = await this.repository.fetchAServiceByName(data.name)
            if (serviceExist) return {
                response: { message: "Service with same name already exist" },
                status: StatusCode.CONFLICT
            }


            //create service
            const created = await this.repository.createService(data)
            return {
                response: { message: 'Success', data: created },
                status: StatusCode.CREATED
            }

        } catch (error) {

            return {
                response: { message: "Error creating service" },
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



export default CreateService

interface Input {
    name: string, description: string, thumbnail: string, images: string[],
    categoryId: string, subcategoryId: string, ownerId: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}