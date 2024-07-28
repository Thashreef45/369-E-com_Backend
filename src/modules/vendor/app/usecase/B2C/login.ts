import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class Login {

    private repository: IRepository
    private createToken
    private verifyPassword

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createToken = dependencies.createToken
        this.verifyPassword = dependencies.verifyPassword
    }


    async execute(data: Input): Promise<Output> {

        //check input credentials
        if (!data.email || !data.password) return {
            response: { message: "Credentials missing" },
            status: StatusCode.INTERNAL_ERROR
        }


        //fetch vendor
        const vendor = await this.repository.fetchVendorWithEmail(data.email)
        if (!vendor) return {
            response: { message: "Vendor not found" },
            status: StatusCode.NOT_FOUND
        }


        // check any verification is pending

        // email verification
        if (!vendor?.otp?.verified) return {
            response: { message: "Your email is not verified" },
            status: StatusCode.UNAUTHORIZED
        }

        // active account verification
        if (!vendor?.active) return {
            response: { message: "Your account activation is pending" },
            status: StatusCode.UNAUTHORIZED
        }


        // verify password
        const passwordVerified = await this.verifyPassword(data.password, vendor?.password)
        if (!passwordVerified) return {
            response: { message: "Password not matching" },
            status: StatusCode.UNAUTHORIZED
        }


        // create token
        const token = this.createToken(data.email)

        return {
            response: { message: "Success", token },
            status: StatusCode.OK
        }

    }
}


export default Login


interface Input {
    email: string,
    password: string
}

interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    createToken(email: string): string
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>
}
