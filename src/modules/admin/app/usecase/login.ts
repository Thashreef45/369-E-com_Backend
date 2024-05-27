import IRepository from "../../infrastructure/interface/IRepository"
import StatusCode from '../../infrastructure/config/staus-code'

class Login {
    private repository: IRepository
    private createToken
    private verifyPassword

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createToken = dependencies.createToken
        this.verifyPassword = dependencies.verifyPassword
    }



    async exectue(data: Input) {


        // fetch data from db
        const isExist = await this.repository.findByEmail(data.email)
        if (!isExist) {
            return {
                response: { message: "User not found"},
                status: StatusCode.NOT_FOUND
            }
        }

        // check password,
        const verified = this.verifyPassword(data.password,isExist.password)
        if(!verified){
            return {
                response: { message: "Password is not matching"},
                status: StatusCode.BAD_REQUEST
            }
        }


        // generate token, if email  and password are matching
        const token = this.createToken(data.email)

        // succesfull response after generating token
        return {
            response: { message: "Success", token: token},
            status: StatusCode.NOT_FOUND
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
    createToken (emai:string):String
    verifyPassword (password:string,hashedPassword:string)
}
