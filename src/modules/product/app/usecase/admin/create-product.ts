import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class CreateProduct {
    private repository : IRepository 
    
    constructor(dependencies:Dependencies){
        this.repository = dependencies.repository
    }

    async execute(data:Input){
        const created  = await this.repository.createProduct(
            data.name,
            data.description,
            data.price,
            data.images,
            data.thumbnail,
            data.stock,
            data.categoryId,
            data.subCategoryId
        )

        return {
            response  : {message : "Product created succesfull"},
            status : StatusCode.CREATED
        }
    }

}

export default CreateProduct


interface Dependencies {
    repository : IRepository
}

interface Input {
    name: String
    description: String
    price: Number
    images: [String]
    thumbnail: String
    stock: Number
    categoryId : String,
    subCategoryId : String
}