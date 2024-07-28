interface IRepository {
    //------------------------------------- category -------------------------------------

    createSubCategory(
        id: string,
        subcategory: { name: string, description: string }
    ): any

    createCategory(name: string, description: string): any

    getCategory(name: string): any
    getCategoryById(id: string): any


    //fetch all categories
    fetchAllCategories(): any




    //------------------------------------- product -------------------------------------


    // create product
    createProduct(
        name: string, description: string, price: number, images: string[],
        thumbnail: string, stock: number, categoryId: string, subCategoryId: string,
        ownerId: string, isAdmin: boolean
    ): any


    getProduct(id: string): any
    getProductByName(name: string): any

    /** products fetching by array of product id */
    getProducts(data: string[]): any

    getAllProducts(): any

    updateProduct(data: {
        productId: string, name: string, description: string,
        price: number, actualPrice: number, offer: boolean, images: string[],
        thumbnail: string, stock: number, categoryId: string, subCategoryId: string
    }): any


    /** product rating only */
    productRating(data: { userId: string, productId: string, rating: number }): Promise<any>

    /** product rating with comment */
    ratingWithComment(data: { userId: string, productId: string, rating: number, comment: string }): Promise<any>



    checkOutCart(data: { productId: string, quantity: number }[]): Promise<any>


    fetchAdminProducts():Promise<any>
}

export default IRepository