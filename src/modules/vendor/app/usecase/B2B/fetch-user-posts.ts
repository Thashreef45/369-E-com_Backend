import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class FetchVendorProducts {

    private fetchVendorProducts: any
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchVendorProducts = dependencies.fetchVendorProducts
    }


    async execute(data: Input): Promise<Output> {


        try {

            // check query
            if (data.active && (data.active !== 'true' && data.active !== 'false')) return {
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
            const output: Output = await this.fetchVendorProducts(param)
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


    /** creats parameter for post fetching publisher */
    createParams(data: Input, ownerId: string) {
        if (!data.active) return {
            ownerId,
        }
        if (data.active == 'true') return {
            ownerId, active: true
        }
        if (data.active == 'false') return {
            ownerId, active: false
        }
    }

}


export default FetchVendorProducts

interface Input {
    email: string
    active?: string | undefined
}


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchVendorProducts(param: { ownerId: string, active?: boolean }): Promise<Output>
    repository: IRepository
}