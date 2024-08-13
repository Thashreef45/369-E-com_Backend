import StatusCode from "../../../infrastructure/config/staus-code"

class FetchCategories {

    private fetchCategories: () => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.fetchCategories = dependencies.fetchCategories
    }

    async execute(): Promise<Output> {
        try {

            const categories = await this.fetchCategories()
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

export default FetchCategories


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {

    fetchCategories(): Promise<Output>
}