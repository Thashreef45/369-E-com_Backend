import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"

class UpdateSubCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {


        try {

            //fetch category by subCategory Id
            const category = await this.repository.fetchCategoryBySubCategoryId(data.subCategoryId)
            if (!category) return {
                response: { message: "Category not found" },
                status: StatusCode.NOT_FOUND
            }

            const nameExist = this.#checkSubCategory(category.subcategories, data.name)
            if (nameExist) return {
                response: { message: "Sub-Category with same name already exist" },
                status: StatusCode.CONFLICT
            }

            //Update category
            const updaeted = await this.repository.updateSubCategory({ ...data, categoryId: category._id })
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


    }


    /** Method will check sub-category with same name in same category already exist or not  */
    #checkSubCategory(subcategories: { name: string }[], name: string): boolean {
        for (let i = 0; i < subcategories.length; i++) {
            if (subcategories[i].name === name) return true
        } return false
    }
}



export default UpdateSubCategory


interface Input {
    subCategoryId: string
    name: string
    description: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}