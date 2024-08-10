import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"

class UpdateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {


        try {
            //fetch category by id
            const category = await this.repository.fetchCategoryById(data.categoryId)
            if (!category) return {
                response: { message: "Category not found" },
                status: StatusCode.NOT_FOUND
            }

            //fetch category by name
            const nameExist = await this.repository.fetchCategoryByName(data.name)
            if (nameExist) return {
                response: { message: "Category with same name already exist" },
                status: StatusCode.CONFLICT
            }


            //Update category
            const updaeted = await this.repository.updateCategory(data)
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
}



export default UpdateCategory


interface Input {
    categoryId: string
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