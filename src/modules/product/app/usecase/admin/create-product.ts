import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class CreateProduct {
    private repository : IRepository 
    
    constructor(dependencies:Dependencies){
        this.repository = dependencies.repository
    }

    async execute(data:Input){
        try {

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


            //todo : have to verify  created , not created  , internal errors
            
            return {
                response  : {message : "Product created succesfull"},
                status : StatusCode.CREATED
            }
        } catch (error) {

            return {
                response  : {message : "Product created failed"},
                status : StatusCode.INTERNAL_ERROR
            }
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