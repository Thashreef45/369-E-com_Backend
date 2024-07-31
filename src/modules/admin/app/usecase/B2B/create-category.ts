import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class CreateCategory {

    private createCategory: (data: Input) => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.createCategory = dependencies.createCategory
    }


    async execute(data: Input): Promise<Output> {

        // check input credentials
        const credentails = this.checkInputCredentials(data)
        if (!credentails.success) return {
            response: { message: credentails.message },
            status: credentails.status
        }

        try {
            //create category
            const created = await this.createCategory(data)
            return {
                response: created.response,
                status: created.status
            }

        } catch (error) {

            return {
                response: { message: "Error creating category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }




    /** Check input credentials */
    checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        if (!data.name || !data.description) return {
            message: 'Credentials missing',
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // credential type checking
        if (
            typeof data.name != 'string' ||
            typeof data.description != 'string'
        ) return {
            message: "Credential type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // description lenght check
        if (data.description.trim().length > 250 || data.description.trim().length < 50) return {
            message: "Description length should be between 50 and 250 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // name lenght check
        if (data.name.trim().length > 10 || data.name.trim().length < 3) return {
            message: "Name length should be between 3 and 10 characters",
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

export default CreateCategory

interface Input {
    name: string
    description: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    createCategory(data: Input): Promise<Output>
}