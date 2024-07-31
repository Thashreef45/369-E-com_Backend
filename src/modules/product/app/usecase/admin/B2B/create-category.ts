import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class CreateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check category exist or not
            const isCatgoryExist = await this.repository.findCategoryByName(data.name)
            if (isCatgoryExist) return {
                response: { message: "Category with same name already exist" },
                status: StatusCode.CONFLICT
            }


            // category creation
            const category = await this.repository.createCategory(data)
            return {
                response: { message: "Success", data: category },
                status: StatusCode.CREATED
            }

        } catch (error) {

            return {
                response: { message: "Error adding product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}
interface Input {
    name: string,
    description: string,
}

interface Output {
    response: { message: string, data?: {} }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


export default CreateCategory