import StatusCode from "../../infrastructure/config/status-code"


class FetchCategories {

    private getCategories: any
    constructor(dependencies: Dependencies) {
        this.getCategories = dependencies.getCategories
    }


    async execute(): Promise<Output> {

        try {
            const categories = await this.getCategories()
            const resData = this.Mapper(categories)
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching categories" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    /** Mapper method for categories */
    Mapper(data: Category[]): Category[] {
        return data.map(x => ({
            _id: x._id, name: x.name, description: x.description
        }))
    }
}


export default FetchCategories

interface Output {
    response: { message: string, data?: Category[] },
    status: StatusCode
}

interface Dependencies {
    getCategories(): Promise<Category[]>
}


interface Category {
    _id: string, name: string, description: string
}


