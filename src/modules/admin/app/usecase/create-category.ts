import StatusCode from "../../infrastructure/config/staus-code"


class CreateCategory {

    private createCategory
    constructor(dependencies: Dependencies) {
        this.createCategory = dependencies.createCategory
    }

    async execute(data: Input): Promise<Output> {


        // check credentials
        if (!data.name || !data.description) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            // create category
            const updated = await this.createCategory(data.name, data.description)
            return {
                response: updated.response,
                status: updated.status,
            }


        } catch (error) {

            return {
                response: { message: "Error creating category" },
                status: StatusCode.INTERNAL_ERROR,
            }
        }


    }

    //returns conflict:409 -- Category already exist  || created:201 -- Success
}

export default CreateCategory




interface Input {
    name: string
    description: string
}


interface Dependencies {
    createCategory(name: string, description: string) : any
}

interface Output {
    response: { message: string },
    status: number
}