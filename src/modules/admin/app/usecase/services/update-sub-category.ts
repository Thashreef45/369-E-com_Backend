import StatusCode from "../../../infrastructure/config/staus-code"


class UpdateSubCategory {

    private updateSubCategory: (data: Input) => Promise<Output>

    constructor(dependencies: Dependencies) {
        this.updateSubCategory = dependencies.updateSubCategory
    }

    async execute(data: Input): Promise<Output> {


        // check credentials
        const credentials = this.#credentialCheck(data)
        if (!credentials.success) return {
            response: credentials.response,
            status: credentials.status
        }

        try {

            // create category
            const updated = await this.updateSubCategory(data)
            return {
                response: updated.response,
                status: updated.status,
            }


        } catch (error) {

            return {
                response: { message: "Error updating category" },
                status: StatusCode.INTERNAL_ERROR,
            }
        }


    }



    /**method for checking input credentials */
    #credentialCheck(data: Input): Output & { success: boolean } {

        //check credentials
        if (!data.name || !data.description || !data.subCategoryId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check credentials type
        if (
            typeof data.name != 'string' ||
            typeof data.description != 'string' ||
            typeof data.subCategoryId != 'string'
        ) return {
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

        //
        if (data.subCategoryId.length > 25) return {
            response: { message: "subCategoryId is not valid" },
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

export default UpdateSubCategory




interface Input {
    subCategoryId: string
    name: string
    description: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    updateSubCategory(data: Input): Promise<Output>
}
