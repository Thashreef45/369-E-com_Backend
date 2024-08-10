import StatusCode from "../../../infrastructure/config/staus-code"


class CreateSubCategory {

    private createSubCategory: (data: {categoryId: string, name: string, description: string }) => Promise<Output>
    constructor(dependencies: Dependencies) {
        this.createSubCategory = dependencies.createSubCategory
    }

    async execute(data: Input): Promise<Output> {

        // check credentials
        const credentials = this.#credentialCheck(data)
        if (!credentials.success) return {
            response: credentials.response,
            status: credentials.status
        }

        try {

            // create  sub-category
            const created = await this.createSubCategory(data)
            return {
                response: created.response,
                status: created.status,
            }

        } catch (error) {

            return {
                response: { message: "Error creating sub-category" },
                status: StatusCode.INTERNAL_ERROR,
            }
        }
    }



    /**method for checking input credentials */
    #credentialCheck(data: Input): Output & { success: boolean } {

        //check credentials
        if (!data.name || !data.description) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check credentials type
        if (typeof data.name != 'string' || typeof data.description != 'string') return {
            response: { message: "Credentials types not matching" },
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // description lenght check
        if (data.description.trim().length > 250 || data.description.trim().length < 50) return {
            response: { message: "Description length should be between 50 and 250 characters" },
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // name lenght check
        if (data.name.trim().length > 10 || data.name.trim().length < 3) return {
            response: { message: "Name length should be between 3 and 10 characters" },
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        return {
            response: { message: "" },
            status: StatusCode.OK,
            success: true
        }
    }
}

export default CreateSubCategory




interface Input {
    categoryId: string
    name: string
    description: string
}


interface Dependencies {
    createSubCategory(data: {categoryId: string, name: string, description: string }): Promise<Output>
}

interface Output {
    response: { message: string },
    status: StatusCode
}