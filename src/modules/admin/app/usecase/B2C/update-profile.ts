import StatusCode from "../../../infrastructure/config/staus-code";
import IRepository from "../../../infrastructure/interface/IRepository";


class UpdateProfile {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        try {
            //check input credentials
            const credentails = this.checkCredentials(data)
            if (!credentails.success) return {
                response: { message: credentails.message },
                status: credentails.status
            }

            //update profile
            const updated = await this.repository.updateProfile(data)
            return {
                response: { message: 'Success' },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating profile" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    private checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        // check input credentials
        if (!data.email || !data.whatsapp || !data.phone) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check credential types
        if (typeof data.email != 'string' ||
            typeof data.whatsapp != 'string' ||
            typeof data.phone != 'string'
        ) return {
            message: "Credentials type not matching",
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

export default UpdateProfile


interface Input {
    email: string,
    whatsapp: string,
    phone: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}