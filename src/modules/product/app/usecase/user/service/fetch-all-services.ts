import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"

class FetchAllServices {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(queries: Query): Promise<Output> {
        try {

            const services : Service[] = await this.repository.fetchAllService(queries)
            return {
                response : { message : "Success",data:services},
                status : StatusCode.OK
            }

        } catch (error) {

            return {

                response: { message: "Error fetching services" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}

export default FetchAllServices

interface Query {
    category?: string, subCategory?: string, query?: string,
    limit?: number, page_no?: number;
}


interface Output {
    response: { message: string, data?: Service[] },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}



interface Service {
    _id: string,
    name: string,
    description: string
    thumbnail: string,
    categoryId: string,
    subcategoryId: string,
}