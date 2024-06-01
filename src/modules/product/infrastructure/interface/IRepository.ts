interface IRepository {
    //------------------------------------- category -------------------------------------

    createSubCategory(
        id: string,
        subcategory: { name: string, description: string }
    ): any

    createCategory(name: string, description: string) : any

    getCategory(name:string) : any
    getCategoryById(id:string) :any


    //fetch all categories
    fetchAllCategories () : any




    //------------------------------------- product -------------------------------------

    // create product
    createProduct(name: String,description: String,
        price: Number,images: String[],
        thumbnail: String,stock: Number,
        categoryId : String,subCategoryId : String
    ) : any

    getProduct(id: string): any
    getProducts(data: string[]): any
    getAllProducts(): any
}

export default IRepository