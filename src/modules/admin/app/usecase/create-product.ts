import StatusCode from "../../infrastructure/config/staus-code"

class CreateProduct {

    private createProduct

    constructor(dependencies: Dependencies) {
        this.createProduct = dependencies.createProduct
    }

    async execute(data: Input): Promise<Output> {

        // validating the input
        const validInput = this.CheckInputData(data)

        if (!validInput) return {
            response: { message: "Missing credentials" },
            status: StatusCode.BAD_REQUEST
        }

        // create the product passing the data to dependency
        const created:Output = await this.createNewProduct(data)
        if(created) return created
        

        return {
            response: { message: "Internal error" },
            status: StatusCode.INTERNAL_ERROR
        }

    }


    // create product 
    private createNewProduct(data: Input) {

        //to create a product , passing data to the dependency
        const updated = this.createProduct(
            data.name, data.description, data.price,
            data.images, data.thumbnail, data.stock,
            data.categoryId , data.subCategoryId
        )
        return updated
    }


    // checks any missing the input credentials.returns true/false
    private CheckInputData(data: Input) {
        if (!data.name || !data.description ||
            !data.price || !data.images.length || !data.thumbnail ||
            !data.stock || !data.categoryId || !data.subCategoryId
        ) return false
        return true
    }
}


export default CreateProduct

interface Dependencies {
    createProduct(name: String, description: String, price: Number
        , images: [String], thumbnail: String, stock: Number,
        categoryId : String,subCategoryId : String
    ): any
}

interface Input {
    name: String
    description: String
    price: Number
    images: [String]
    thumbnail: String
    stock: Number
    categoryId : String,
    subCategoryId : String,
}

interface Output {
    response: { message: String },
    status: StatusCode
}