// ADMIN ROLE

import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class CreateMembership {


    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }



    async execute(data: Input): Promise<Output> {


        try {

            // check already exist or not
            const alreadyExist = await this.repository.findMembershipByName(data.name)
            if (alreadyExist) return {
                response: { message: "Membership with same name already exist" },
                status: StatusCode.CONFLICT
            }


            // creation part
            const created = await this.repository.createMembership(data)
            return {
                response: { message: "Success", data: created },
                status: StatusCode.CREATED
            }

        } catch (error) {

            return {
                response: { message: "Error creating membership" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}


export default CreateMembership



interface Input {
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}


interface Output {
    response: { message: string, data?: {} }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}