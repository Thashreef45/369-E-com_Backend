import StatusCode from "../../../infrastructure/config/staus-code"


class CreateSubCategory {

    private createNewSubCategory

    constructor(dependencies: Dependencies) {
        this.createNewSubCategory = dependencies.createNewSubCategory
    }

    async execute(data: Input): Promise<Output> {


        //check credentials
        if (!data.categoryId || !data.name || !data.description) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {

            //create sub-category
            const updated :Output = await this.createNewSubCategory(data.categoryId, data.name, data.description)
            return {
                response: updated.response,
                status: updated.status,
            }

        } catch (error) {
            console.log(error,'error vannu')
            return {
                response: { message: "Error creating sub-category" },
                status: StatusCode.INTERNAL_ERROR,
            }
        }

    }
}

// response: { message: "Category not exist" }, status: StatusCode.NOT_FOUND
// response: { message: "Sub-Category already exist" }, status: StatusCode.CONFLICT
// response: { message: "Success" }, status: StatusCode.CREATED


export default CreateSubCategory




interface Input {
    categoryId: string
    name: string
    description: string
}


interface Dependencies {
    createNewSubCategory(categoryId: string, name: string, description: string): any
}

interface Output {
    response: any,
    status: number
}