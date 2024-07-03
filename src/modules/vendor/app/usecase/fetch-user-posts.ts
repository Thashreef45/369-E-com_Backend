import StatusCode from "../../infrastructure/config/staus-code"



class FetchUserPost {

    private fetchUserPosts
    private fetchUser

    constructor(dependencies: Dependencies) {
        this.fetchUser = dependencies.fetchUser
        this.fetchUserPosts = dependencies.fetchUserPosts
    }


    async execute(data: Input): Promise<Output> {


        try {
            // credential check
            if (!data.phone) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }
            // check query
            if (data.query && (data.query !== 'true' && data.query !== 'false')) {
                return {
                    response: { message: "Invalid query parameter" },
                    status: StatusCode.BAD_REQUEST
                }
            }


            //fetch user
            const user = await this.fetchUser(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            // param
            const param = this.createParams(data, user._id)

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
    createParams(data: Input, userId: string) {
        if (!data.query) return {
            userId,
        }
        if (data.query == 'true') return {
            userId, query: true
        }
        if (data.query == 'false') return {
            userId, query: false
        }
    }

}


export default FetchUserPost

interface Input {
    phone: string
    query: undefined | string | any
}


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchUser(phone: string): any
    fetchUserPosts(param: { userId: string, query: boolean }): any
}