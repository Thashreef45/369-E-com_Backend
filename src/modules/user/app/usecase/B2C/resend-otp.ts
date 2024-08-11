import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class ResendOTP {

    private repository: IRepository

    private sendOtp: (phone: string, otp: string) => any
    private createToken: (phone: string) => string
    private generateOtp: () => string

    constructor(dependencies: Dependencies) {
        this.generateOtp = dependencies.generateOtp
        this.createToken = dependencies.createToken
        this.sendOtp = dependencies.sendOtp

        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        const credential = this.#checkInputCredentials(data)
        if (!credential.success) return {
            response: { message: credential.message },
            status: credential.status
        }


        try {

            //check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.CREATED
            }


            const otp = this.generateOtp()
            const updateDB = await this.repository.updateOtp(data.phone, otp)

            // send otp to the user
            this.sendOtp(data.phone, otp)

            const token = this.createToken(data.phone) //create temporary token

            return {
                response: { message: 'Success', token: token },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: 'Internal error' },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }

    #checkInputCredentials(data: Input): { message: string, success: boolean, status: StatusCode } {

        if (!data.phone) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (typeof data.phone != 'string') return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.phone.length > 13) return {
            message: "Invalid credential",
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

export default ResendOTP


interface Input {
    phone: string
}


interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    generateOtp(): string
    createToken(phone: string): string
    sendOtp(phone: string, otp: string): any
}

