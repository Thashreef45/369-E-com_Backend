import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from '../../../infrastructure/config/staus-code'


class CreateCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {
        const isExist = await this.repository.getCategory(data.name)
        
        if(isExist) {
            return {
                response: {message:"Category already exist"}, status: StatusCode.CONFLICT
            }
        }

        const created = await this.repository.createCategory(data.name,data.description)
        //todo : after succefull update succefull return
        return {
            response: {message:"Category created"}, status: StatusCode.CREATED
        }
    }
}


export default CreateCategory


interface Dependencies {
    repository: IRepository
}

interface Input {
    name: string,
    description: string
}

interface Output {
    status: StatusCode
    response: Object
}