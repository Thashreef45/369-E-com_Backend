import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class AddProduct {
    constructor() {

    }


    async execute() {

    }
}



interface Input {
    email: string
}


interface Output {
    response: { message: string, data?: {} },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    createToken(email: string): string
}