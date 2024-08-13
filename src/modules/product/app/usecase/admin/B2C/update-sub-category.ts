import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository"

class UpdateSubCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        try {


            // fetch category by subCategoryId
            const category = await this.repository.getCategoryBySubCategoryId(data.subCategoryId)
            if (!category) return {
                response: { message: "Category not found" },
                status: StatusCode.NOT_FOUND
            }

            // check for name conflict
            const nameExist = this.#checkSubCategory(category.subcategories, data.name)
            if (nameExist) return {
                response: { message: "Sub-Category with same name already exist" },
                status: StatusCode.CONFLICT
            }


            // update
            const update = this.repository.updateSubCategory({ ...data, categoryId: category._id })
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }




        } catch (error) {
            return {
                response: { message: "Error updating sub-category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    #checkSubCategory(categories: { name: string }[], name: string): boolean {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name == name) return true
        } return false
    }

}

export default UpdateSubCategory

interface Input {
    subCategoryId: string,
    name: string,
    description: string
}

interface Output {
    response: { message: string }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}