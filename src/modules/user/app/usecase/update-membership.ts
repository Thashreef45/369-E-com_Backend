import StatusCode from "../../infrastructure/config/staus-code"
import IRepository from "../../infrastructure/interface/IRepository"


class UpdateMembership {


    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {


            // check membership exist or not
            const isExist = await this.repository.findMembershipById(data.membershipId)
            if (!isExist) return {
                response: { message: "Membership not found" },
                status: StatusCode.NOT_FOUND
            }


            //update membership
            const updated = await this.repository.updateMembership(data)


            //demo response
            return {
                response: { message: "" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response : { message : "Error updating membership"},
                status : StatusCode.INTERNAL_ERROR
            }
        }
    }


}


export default UpdateMembership


interface Input {
    membershipId: string,
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}

interface Output {
    response: { message: string }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}
