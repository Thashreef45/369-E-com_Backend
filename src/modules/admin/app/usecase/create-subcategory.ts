import StatusCode from "../../infrastructure/config/staus-code"


class CreateSubCategory {

    private createNewSubCategory
    constructor(dependencies:Dependencies) {
        this.createNewSubCategory = dependencies.createNewSubCategory
    }

    async execute(data: Input): Promise<Output> {

        const updated = await this.createNewSubCategory(data.categoryId,data.name,data.description)
        if(updated){
            return {
                response: updated.message,
                status: Number(updated.status),
            }
        }else {
            return {
                response: "Internal error",
                status: StatusCode.INTERNAL_ERROR,
            } 
        }
    }
}

export default CreateSubCategory




interface Input {
    categoryId : string
    name: string
    description: string
}


interface Dependencies {
    createNewSubCategory(categoryId:string,name:string,description:string) 
}

interface Output {
    response: any,
    status: number
}