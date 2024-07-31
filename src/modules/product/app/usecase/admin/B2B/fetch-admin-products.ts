import StatusCode from "../../../../infrastructure/config/staus-code";
import IRepository from "../../../../infrastructure/interface/IRepository-B2B";


class FetchAdminProducts {

    private repository: IRepository
    constructor(dependencies: Dependencies) { }

    async execute(data: Input): Promise<Output> {

        try {
            const products = this.repository.fetchOwnerAllPosts(data.ownerId)

            // demo response
            return {
                response: { message: 'Success', data: products },
                status: StatusCode.OK
            }
        } catch (error) {
            
            return {
                response: { message: "Error fetching products" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}



export default FetchAdminProducts



interface Input {
    ownerId: string
}

interface Output {
    response: { message: string, data?: {} }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}