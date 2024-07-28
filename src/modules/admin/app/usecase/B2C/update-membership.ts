import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class UpdateMembership {

    private repository: IRepository
    private updateMembership : any
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        const credentails = this.checkCredentials(data)
        if (!credentails.success) return {
            response: { message: credentails.message },
            status: credentails.status
        }

        try {

            const updated: Output = await this.updateMembership(data)
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {


            return {
                response: { message: "Error updating membership" },
                status: StatusCode.INTERNAL_ERROR
            }

        }
    }



    /** Method for checking input credentials */
    checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {


        // check input credential
        if (!data.membershipId || !data.name || !data.description || !data.price ||
            !data.thumbanail || !data.features
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        //check input credential type
        if (typeof data.membershipId != 'string' ||
            typeof data.name != 'string' ||
            typeof data.description != 'string' ||
            typeof data.price != 'number' ||
            typeof data.thumbanail != 'string' ||
            !Array.isArray(data.features) ||
            data.features.every(features => typeof features !== 'string')
        ) return {
            message: "Credential types not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }



        // features must less than 6 ,(1-5)
        if (data.features.length > 6) return {
            message: "Features cannot be more than 5",
            status: StatusCode.BAD_REQUEST,
            success: false
        }



        // checking that length of every features
        for (let i = 0; i < data.features.length; i++) {
            if (data.features[i].length > 50) return {
                message: "Feature should be less than 50 characters",
                status: StatusCode.BAD_REQUEST,
                success: false
            }
        }


        // description check
        if(data.description.length > 250 || data.description.length < 50) return {
            message : "Description length should be between 50 and 250 characters",
            status : StatusCode.BAD_REQUEST,
            success : false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
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
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    updateMembership(data: Input): Promise<Output>
}