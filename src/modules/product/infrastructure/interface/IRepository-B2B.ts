

interface IRepository {
    //------------------------------------- category -------------------------------------

    createCategory(data: { name: string, description: string }): Promise<any>

    findCategory(id: string): Promise<any>


    /** Fetch all categories */
    fetchAllCategories(): Promise<any>



    //------------------------------------- product -------------------------------------

    // create product
    createProduct(
        name: String, description: String,
        price: Number, images: String[],
        thumbnail: String,
        categoryId: String,
        userId: string
    ): Promise<any>


    /** Fetch a product active its with id  */
    findProduct(id: string): Promise<any>

    updateProduct(name: string, description: string,
        price: number, thumbnail: string, images: string[],
        categoryId: string, productId: string
    ): Promise<any>


    removeProduct(productId: string): Promise<any>


    fetchOwnerAllPosts(ownerId: string): Promise<any>


    fetchOwnerPosts(ownerId: string, active: boolean): Promise<any>


    activateProduct(productId: string): Promise<any>

    fetchAllproducts(query: {
        limit?: number;
        category?: string;
        page_no?: number;
        query?: string;
        lowest_price?: number;
        highest_price?: number;
        sort?: 'price-low' | 'price-high' | 'latest';
    }): Promise<any>



}

export default IRepository