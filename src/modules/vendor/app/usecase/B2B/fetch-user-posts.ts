import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class FetchUserPost {

    private fetchUserPosts
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchUserPosts = dependencies.fetchUserPosts
    }


    async execute(data: Input): Promise<Output> {


        try {

            // check query
            if (data.query && (data.query !== 'true' && data.query !== 'false')) return {
                response: { message: "Invalid query parameter" },
                status: StatusCode.BAD_REQUEST
            }



            //fetch vendor
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }


            // param
            const param = this.createParams(data, vendor._id)

            // fetch all post
            const output: Output = await this.fetchUserPosts(param)
            return {
                response: output.response,
                status: output.status
            }
        } catch (error) {

            return {
                response: { message: "Error fetching posts" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    // creats parameter for post fetching publisher
    createParams(data: Input, ownerId: string) {
        if (!data.query) return {
            ownerId,
        }
        if (data.query == 'true') return {
            ownerId, query: true
        }
        if (data.query == 'false') return {
            ownerId, query: false
        }
    }

}


export default FetchUserPost

interface Input {
    email: string
    query?: any
}


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchUserPosts(param: { ownerId: string, query?: boolean }): Promise<Output>
    repository: IRepository
}