

interface IRepository {
    //------------------------------------- category -------------------------------------

    createCategory(data: { name: string, description: string }): Promise<any>

    findCategory(id: string): any


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
    ): any


    findProduct(id: string): any

    updateProduct(name: string, description: string,
        price: number, thumbnail: string, images: string[],
        categoryId: string, productId: string
    ): any


    removeProduct(productId: string): any


    fetchOwnerAllPosts(ownerId: string): any


    fetchOwnerPosts(ownerId: string, active: boolean): any

    activateProduct(productId: string): any



}

export default IRepository