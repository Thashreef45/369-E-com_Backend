import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from '../../../infrastructure/config/staus-code'

class Login {
    private repository: IRepository
    private createToken
    private verifyPassword

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createToken = dependencies.createToken
        this.verifyPassword = dependencies.verifyPassword
    }



    async exectue(data: Input): Promise<Output> {
        

        //check input credentials
        if(!data.email || !data.password) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        // check admin exist or not
        const isExist = await this.repository.findByEmail(data.email)
        if (!isExist) return {
            response: { message: "User not found" },
            status: StatusCode.NOT_FOUND
        };


        // check password,
        const verified = await this.verifyPassword(data.password, isExist.password)
        if (!verified) return {
            response: { message: "Password is not matching" },
            status: StatusCode.UNAUTHORIZED
        };



        // generate token, if email  and password are matching
        const token = this.createToken(data.email)


        // succesfull response
        return {
            response: { message: "Success", token: token },
            status: StatusCode.OK
        }

    }
}

export default Login

interface Input {
    email: string
    password: string
}


interface Dependencies {
    repository: IRepository
    createToken(emai: string): string
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>
}

interface Output {
    response: { message: string, token?: string },
    status: StatusCode
}
