import IRepository from "../../../../infrastructure/interface/IRepository-services"
import StatusCode from '../../../../infrastructure/config/staus-code'


class CreateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            const created = await this.repository.createCategory(data)
            return {
                response: { message: "Success", data: created },
                status: StatusCode.CREATED
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


interface Input {
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