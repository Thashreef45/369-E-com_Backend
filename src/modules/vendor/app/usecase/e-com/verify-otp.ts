import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class VerifyOtp {

    private repository: IRepository
    private createToken

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createToken = dependencies.createToken
    }

    async execute(data: Input): Promise<Output> {

        //check credentials
        if (!data.otp) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        // check vendor exist or not
        const vendor = await this.repository.fetchVendorWithEmail(data.email)
        if (!vendor) return {
            response: { message: "Email not found" },
            status: StatusCode.NOT_FOUND
        }


        // check vendor otp is already have verified or not
        if (vendor?.otp?.verified) return {
            response: { message: "Account already have been verified" },
            status: StatusCode.CONFLICT
        }


        //check otp
        if (vendor?.otp?.number != data.otp) return {
            response: { message: "Otp is not matching" },
            status: StatusCode.UNAUTHORIZED
        }



        // generate token 
        const token = this.createToken(vendor?.email)


        return {
            response: { message: "Success", token },
            status: StatusCode.OK
        }


    }
}



export default VerifyOtp


interface Input {
    otp: string
    email: string
}


interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    createToken(email: string): string
}