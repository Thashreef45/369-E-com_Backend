import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAService {

    private fetchAService: (serviceId: string) => Promise<any>
    private repository: IRepository

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

            //fetch vendor
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if(!vendor) return {
                response : { message : "Vendor account not found"},
                status : StatusCode.NOT_FOUND
            }

            const service = await this.fetchAService(data.serviceId)
            if (!service) return {
                response: { message: "Service not found" },
                status: StatusCode.NOT_FOUND
            }


            //check owner is authentic or not
            if(String(service.ownerId) !== String(vendor._id)) return{
                response : { message :"You are not authorized to access this service"},
                status : StatusCode.UNAUTHORIZED
            }

            return {
                response: { message: "Success", data: service },
                status: StatusCode.OK
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

        // Check if all required fields are provided
        if (!data.serviceId) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // Check input credential types
        if (typeof data.serviceId !== 'string') return {
            message: 'Credential type not matching',
            status: StatusCode.BAD_REQUEST,
            success: false
        };



        // If all checks pass
        return {
            message: "",
            status: StatusCode.OK,
            success: true
        };

    }



}

export default FetchAService


interface Input {
    serviceId: string
    email: string
}

interface Output {
    response: { message: string, data?: any }, //todo  * any have to replace with service interface
    status: StatusCode
}

interface Dependencies {
    fetchAService(serviceId: string): Promise<any>
    repository: IRepository
}