
import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ActivateService {

    private activateService: (data: {serviceId: string,ownerId: string}) => Promise<Output>
    private repository : IRepository

    constructor(dependencies: Dependencies) {
        this.activateService = dependencies.activateService
        this.repository = dependencies.repository
    }



    async execute(data: Input): Promise<Output> {

        //check input credentials
        const credentials = this.#checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }

        try {

            const admin = await this.repository.findByEmail(data.email)
            if(!admin) return {
                response : { message : "Admin account not found"},
                status : StatusCode.NOT_FOUND
            }

            const updated = await this.activateService({...data,ownerId:admin._id})
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {


            return {
                response: { message: "Error activating service" },
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

export default ActivateService


interface Input {
    serviceId: string
    email: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    activateService (data: {serviceId: string,ownerId: string}) : Promise<Output>
    repository : IRepository
}