import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"



class FetchAllProducts {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {

            // fetching all posts
            if (typeof data.active == 'undefined') {
                const posts = await this.repository.fetchOwnerAllPosts(data.ownerId)
                return {
                    response: { message: "Succes", data: posts },
                    status: StatusCode.OK
                }
            }


            // fetching posts on active - true/false
            if (data.active == true || data.active == false) {
                const posts = await this.repository.fetchOwnerPosts(data.ownerId, data.active)
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

export default FetchAllProducts


interface Input {
    ownerId: string,
    active?: boolean | undefined
}

interface Output {
    response: { message: string, data?: [] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}