import StatusCode from "../../../infrastructure/config/status-code"



class FetchAService {

    private fetchAService: (serviceId: string) => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.fetchAService = dependencies.fetchAService
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        const credentials = this.#checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        try {

            //fetch data
            const service = await this.fetchAService(data.serviceId)
            return {
                response: service.response,
                status: service.status
            }

        } catch (error) {

            return {
                response: { message: "Error fetching service" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }



    /** Method for checking input credentials */
    #checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        if (!data.serviceId) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.serviceId.length > 25) return {
            message: "Invalid service id",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }

}


export default FetchAService

interface Input {
    serviceId: string
}

interface Output {
    response: { message: string, data?: resData },
    status: StatusCode
}

interface Dependencies {
    fetchAService(serviceId: string): Promise<Output>
}




interface resData {
    _id: string
    name: string
    description: string
    thumbnail: string
    images: string[]
    categoryId: string
    subcategoryId: string,
    enquiry: Social
}


//  admin/vendor
interface Social {
    whatsapp: String,
    phone: String,
}