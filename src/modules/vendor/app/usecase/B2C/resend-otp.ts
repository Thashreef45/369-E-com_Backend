import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class ResendOtp {

    private repository: IRepository
    private generateOtp
    private sendOtp

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        //check input credentials
        if (!data.email) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            
            // fetch vendor
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }

            // otp verified or not check
            if (vendor?.otp.verified) return {
                response: { message: "Email already have been verified" },
                status: StatusCode.CONFLICT
            }

            // resend otp
            const otp = this.generateOtp()
            this.sendOtp(otp, data.email)


            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }
        } catch (error) {

            return {
                response: { message: "Error resending otp" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }

}

export default ResendOtp

interface Input {
    email: string
}

interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    generateOtp(): string
    sendOtp(otp: string, email: string)
}
