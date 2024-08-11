interface IRepository {
    //------------------------------------- category -------------------------------------

    createSubCategory(
        id: string,
        subcategory: { name: string, description: string }
    ): Promise<any>

    createCategory(name: string, description: string): Promise<any>

    getCategory(name: string): Promise<any>
    getCategoryById(id: string): Promise<any>


    //fetch all categories
    fetchAllCategories(): Promise<any>




    //------------------------------------- product -------------------------------------


    // create product
    createProduct(
        name: string, description: string, price: number, images: string[],
        thumbnail: string, stock: number, categoryId: string, subCategoryId: string,
        ownerId: string, isAdmin: boolean
    ): Promise<any>


    /** Fetch a product by productId */
    getProduct(id: string): Promise<any>

    
    /** fetch a single product by id  without feedbacks*/
    fetchProduct(id: string): Promise<any>


    getProductByName(name: string): Promise<any>

    /** products fetching by array of product id */
    getProducts(data: string[]): Promise<any>


    /** Fetch product feedbacks , with page_no and limit */
    getFeedbacks(data: { productId: string, page_no?: number, limit?: number }): Promise<any>


    /** Method fetches all products based on query filtration and sorting options */
    getAllProducts(query: {
        limit?: number;
        category?: string;
        sub_category?: string;
        page_no?: number;
        query?: string;
        lowest_price?: number;
        highest_price?: number;
        rating?: number;
        sort?: string;
    }): Promise<any>

    updateProduct(data: {
        productId: string, name: string, description: string,
        price: number, actualPrice: number, offer: boolean, images: string[],
        thumbnail: string, stock: number, categoryId: string, subCategoryId: string
    }): Promise<any>


    /** product rating only */
    productRating(data: { userId: string, productId: string, rating: number }): Promise<any>

    /** product rating with comment */
    ratingWithComment(data: { userId: string, productId: string, rating: number, comment: string }): Promise<any>



    checkOutCart(data: { productId: string, quantity: number }[]): Promise<any>


    fetchAdminProducts(query: any): Promise<any>


    fetchOwnerProducts(data: { ownerId: string, query: any }): Promise<any>

}

export default IRepository