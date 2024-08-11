import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"

class FetchAllCategories {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(): Promise<Output> {

        try {
            const data = this.repository.fetchAllCategories()
            return {
                response: { message: "Success", data },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching categories" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}



export default FetchAllCategories

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}