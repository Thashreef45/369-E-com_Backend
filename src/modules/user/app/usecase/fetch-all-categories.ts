import StatusCode from "../../infrastructure/config/status-code"


class FetchAllCategories {

    private fetchCategories
    constructor(dependencies: Dependencies) {
        this.fetchCategories = dependencies.fetchCategories
    }


    async execute(): Promise<Output> {
        try {

            const data = await this.fetchCategories()

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
    response: { message: string, data?: {}[] },
    status: StatusCode
}

interface Dependencies {
    fetchCategories: () => Promise<{}[]>
}



