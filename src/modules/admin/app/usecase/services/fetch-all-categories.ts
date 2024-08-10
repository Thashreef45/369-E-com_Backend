import { response } from "express"
import StatusCode from "../../../infrastructure/config/staus-code"


class FetchAllCategories {

    private fetchAllCategories: () => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.fetchAllCategories = dependencies.fetchAllCategories
    }

    async execute(data: Input): Promise<Output> {

        try {
            const categories = await this.fetchAllCategories()
            return {
                response: categories.response,
                status: categories.status
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


interface Input {
    email: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchAllCategories(): Promise<Output>
}
