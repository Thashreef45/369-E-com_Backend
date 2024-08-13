import StatusCode from "../../../infrastructure/config/staus-code"

class UpdateCategory {

    private updateCategory: (data: Input) => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.updateCategory = dependencies.updateCategory
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
            const updated = await this.updateCategory(data)
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {

            return {
                response: { message: "Error updating category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }




    /** Check input credentials */
    checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        if (!data.name || !data.description || !data.categoryId) return {
            message: 'Credentials missing',
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // credential type checking
        if (
            typeof data.name != 'string' ||
            typeof data.description != 'string' ||
            typeof data.categoryId != 'string'
        ) return {
            message: "Credential type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check category id
        if (data.categoryId.length > 25) return {
            message: "Invalid categoryId",
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

export default UpdateCategory


interface Input {
    categoryId: string
    name: string
    description: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    updateCategory(data: Input): Promise<Output>
}