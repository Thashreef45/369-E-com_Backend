

interface IRepository {
    //------------------------------------- category -------------------------------------

    createCategory(data: { name: string, description: string }): Promise<any>

    updateCategory(data: { categoryId: string, name: string, description: string }): Promise<any>


    createSubCategory(data: { categoryId: string, name: string, description: string }): Promise<any>


    /** Update a sub-category */
    updateSubCategory(data: { categoryId: string, subCategoryId: string, name: string, description: string }): Promise<any>


    findCategory(id: string): Promise<any>


    /** Fetch all categories */
    fetchAllCategories(): Promise<any>


    /** Find category with its name */
    findCategoryByName(name: string): Promise<any>


    /** Fetch Category by subcategory name */
    findCategoryBySubCategoryId(name: string): Promise<any>



    //------------------------------------- product -------------------------------------

    // create product
    createProduct(data:
        {
            name: string, description: string, images: string[], thumbnail: string,
            categoryId: string, subCategoryId: string, ownerId: string
        }
    ): Promise<any>


    /** Fetch a active product  its with id  */
    findProduct(id: string): Promise<any>

    /** Fetch a product,with id */
    fetchProuct(id: string): Promise<any>

    updateProduct(data:
        {
            name: string, description: string, thumbnail: string, images: string[],
            categoryId: string, subCategoryId: string, productId: string
        }
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