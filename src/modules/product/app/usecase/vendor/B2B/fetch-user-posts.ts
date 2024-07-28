import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"



class FetchAllPosts {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {

            // fetching all posts
            if (typeof data.query == 'undefined') {
                const posts = await this.repository.fetchOwnerAllPosts(data.ownerId)
                return {
                    response: { message: "Succes", data: posts },
                    status: StatusCode.OK
                }
            }


            // fetching posts on active - true/false
            if (data.query == true || data.query == false) {
                const posts = await this.repository.fetchOwnerPosts(data.ownerId, data.query)
                return {
                    response: { message: "Success", data: posts },
                    status: StatusCode.OK
                }
            }
            else throw new Error('Invalid query')


        } catch (error) {
            return {
                response: { message: "Error fetching products" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}

export default FetchAllPosts


interface Input {
    ownerId: string,
    query?: boolean | undefined
}

interface Output {
    response: { message: string, data?: [] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}