import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class CreateProduct {

    private repository:IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            //check category exist or not
            const isCatgoryExist = await this.repository.findCategory(data.categoryId)
            if(!isCatgoryExist) return {
                response: { message: "Category not exist" },
                status: StatusCode.NOT_FOUND
            }


            // product creation
            const product = await this.repository.createProduct(data)
            return {
                response: { message: "Success" ,product:product},
                status: StatusCode.CREATED
            }

        } catch (error) {
            return {
                response: { message: "Error adding product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }
}
interface Input {
    name: string,
    description: string,
    // price: number,
    thumbnail: string,
    images: string[]
    categoryId: string,

    subCategoryId: string

    ownerId: string
}

interface Output {
    response: { message: string , product ?:{}}
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


export default CreateProduct