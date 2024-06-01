import StatusCode from "../../infrastructure/config/staus-code"


class FetchAllCategory {

    private fetchAllCategory

    constructor(dependencies: Dependencies) {
        this.fetchAllCategory = dependencies.fetchAllCategory
    }

    async execute(): Promise<Output> {

        //fetching category data
        const categories = await this.fetchAllCategory()


        if (!categories) return {
            response: { message: 'Category fetching failed' },
            status: StatusCode.BAD_REQUEST
        }

        return {
            response: { message: 'Success', data: categories },
            status: StatusCode.ACCEPTED
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