import IRepository from "../../../../infrastructure/interface/IRepository-services"
import StatusCode from '../../../../infrastructure/config/staus-code'


class CreateSubCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            // fethc category by id
            const category = await this.repository.fetchCategoryById(data.categoryId)
            if (!category) return {
                response: { message: "Category not found " },
                status: StatusCode.NOT_FOUND
            }

            //check sub-category already exist
            const nameExist = this.#checkSubCategory(category.subcategories, data.name)
            if(nameExist) return {
                response: { message: "Sub-Category with same name already exist" },
                status: StatusCode.CONFLICT
            }

            const created = await this.repository.createSubCategory(data)
            return {
                response: { message: "Success"},
                status: StatusCode.CREATED
            }

        } catch (error) {

            return {
                response: { message: "Error creating category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    /** Method will check sub-category with same name in same category already exist or not  */
    #checkSubCategory(subcategories: { name: string }[], name: string) :boolean {
        for(let i = 0 ; i < subcategories.length ; i++){
            if(subcategories[i].name === name) return true
        } return false
    }
}

export default CreateSubCategory


interface Input {
    categoryId: string
    name: string
    description: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}