import StatusCode from "../../infrastructure/config/staus-code"


class CreateCategory {

    private createCategory
    constructor(dependencies:Dependencies) {
        this.createCategory = dependencies.createCategory
    }

    async execute(data: Input): Promise<Output> {

        const updated = await this.createCategory(data.name,data.description)
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

export default CreateCategory




interface Input {
    name: string
    description: string
}


interface Dependencies {
    createCategory(name:string,description:string) 
}

interface Output {
    response: any,
    status: number
}