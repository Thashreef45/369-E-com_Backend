import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"



class UpdateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            const nameExist = await this.repository.findCategoryByName(data.name)
            if (nameExist) return {
                response: { message: "Category with same name already exist" },
                status: StatusCode.CONFLICT
            }

            const updated = await this.repository.updateCategory(data)
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
    categoryId: string,
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