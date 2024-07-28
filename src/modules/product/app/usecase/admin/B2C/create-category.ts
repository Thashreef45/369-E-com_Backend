import IRepository from "../../../../infrastructure/interface/IRepository"
import StatusCode from '../../../../infrastructure/config/staus-code'


class CreateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }
    // Unauthorized
    async execute(data: Input): Promise<Output> {

        try {

            //check if category already exist or not  (checking with name)
            const isExist = await this.repository.getCategory(data.name)
            if (isExist) return {
                response: { message: "Category already exist" }, status: StatusCode.CONFLICT
            }



            // create category
            const created = await this.repository.createCategory(data.name, data.description)
            return {
                response: { message: "Success",category:created}, status: StatusCode.CREATED
            }


        } catch (error) {

            return {
                response: { message: "Error creating category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }
}


export default CreateCategory


interface Dependencies {
    repository: IRepository
}

interface Input {
    name: string,
    description: string
}

interface Output {
    response: { message: string  , category?:{}}
    status: StatusCode
}