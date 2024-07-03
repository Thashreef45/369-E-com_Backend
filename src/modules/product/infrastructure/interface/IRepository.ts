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
    getProductByName(name: string) : any

    getProducts(data: string[]): any
    getAllProducts(): any

    updateProduct(data: {
        productId: string, name: string, description: string,
        price: number, images: string[], thumbnail: string,
        stock: number, categoryId: string, subCategoryId: string
    }) : any
}

export default IRepository