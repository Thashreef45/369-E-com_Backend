import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class CreateProduct {
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {


        try {

            //check category
            const isCatgoryExist = await this.repository.getCategoryById(data.categoryId)
            if (!isCatgoryExist) return {
                response: { message: "Category not exist" },
                status: StatusCode.NOT_FOUND
            }


            //check sub-category
            const valideSubCategory = this.checkCategory(isCatgoryExist?.subcategories, data.subCategoryId)
            if (!valideSubCategory) return {
                response: { message: "Sub-category not exist" },
                status: StatusCode.NOT_FOUND
            }



            //check product already exist or not with same name
            const productExist = await this.repository.getProductByName(data.name)
            if(productExist) return {
                response: { message: "Product with same name already exist" },
                status: StatusCode.CONFLICT
            }



            //create product
            const created = await this.repository.createProduct(
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
                response: { message: "Product created succesfull", data: created },
                status: StatusCode.CREATED
            }

        } catch (error) {
            console.log(error)
            return {
                response: { message: "Error creating product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    //method for checking sub-category exist or not in category
    checkCategory(subcategories: {_id:string}[], subCategoryId: string): boolean {

        for(let i = 0 ; i < subcategories.length ; i++){
            if(subcategories[i]?._id == subCategoryId) return true
        }return false

    }



}

export default CreateProduct


interface Dependencies {
    repository: IRepository
}

interface Input {
    name: string
    description: string
    price: number
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string,
    subCategoryId: string
}