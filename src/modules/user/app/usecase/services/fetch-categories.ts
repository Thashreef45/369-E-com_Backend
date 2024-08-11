import StatusCode from "../../../infrastructure/config/status-code"


class FetchCategories {

    private fetchAllCategories: () => Promise<any>
    constructor(dependencies: Dependencies) {
        this.fetchAllCategories = dependencies.fetchAllCategories
    }

    async execute(): Promise<Output> {

        try {
            const categories = this.fetchAllCategories()


            //demo return 
            return {
                response: { message: 'Success', data: categories },
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

export default FetchCategories

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    fetchAllCategories(): Promise<any>
}