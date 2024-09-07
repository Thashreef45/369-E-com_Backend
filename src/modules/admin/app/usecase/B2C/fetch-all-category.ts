import StatusCode from "../../../infrastructure/config/staus-code"


class FetchAllCategory {

    private fetchAllCategory: () => Promise<any>

    constructor(dependencies: Dependencies) {
        this.fetchAllCategory = dependencies.fetchAllCategory
    }

    async execute(): Promise<Output> {

        try {
            //fetching category data
            const categories = await this.fetchAllCategory()

            return {
                response: { message: 'Success', data: categories },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: 'Category fetching failed' },
                status: StatusCode.BAD_REQUEST
            }
        }

    }
}



interface Dependencies {
    fetchAllCategory(): Promise<any>
}
interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

export default FetchAllCategory