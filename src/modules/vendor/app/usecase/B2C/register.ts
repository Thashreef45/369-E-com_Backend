import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class Register {

    private repository: IRepository
    private createOtpToken :any
    private hashPassword :any
    private generateOtp : any
    private sendOtpToEmail :any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createOtpToken = dependencies.createOtpToken
        this.generateOtp = dependencies.generateOtp
        this.sendOtpToEmail = dependencies.sendOtpToEmail
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        if (!data.name || !data.email || !data.password || !data.phone || !data.about || data.whatsapp) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST,
        }



        try {


            //check that user already exist

            //email
            let vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (vendor) return {
                response: { message: "This email have been already used" },
                status: StatusCode.CONFLICT
            }


            //phone
            vendor = await this.repository.fetchVendorWithPhone(data.phone)
            if (vendor) return {
                response: { message: "This phone number have been already used" },
                status: StatusCode.CONFLICT
            }


            //generate otp
            const otp = this.generateOtp()


            //hash password
            const password = await this.hashPassword(data.password)
            data.password = password



            //update user data
            const create = await this.repository.registratioin({ ...data, otp: otp })


            // sendOtp
            this.sendOtpToEmail(otp, data.email)



            const token = this.createOtpToken(data.email)
            //succesfull return 
            return {
                response: { message: "Success", token: token },
                status: StatusCode.OK
            }


        } catch (error) {

            return {
                response: { message: "Error registering vendor" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


    }
}

export default Register




interface Input {
    name: string
    phone: string
    email: string
    about: string
    password: string,
    whatsapp: string
}


interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    createOtpToken(phone: string): string
    hashPassword(password: string): Promise<string>
    generateOtp(): string
    sendOtpToEmail(otp: string, email: string): void
}

