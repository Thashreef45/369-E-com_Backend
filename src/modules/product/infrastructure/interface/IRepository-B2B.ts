

interface IRepository {
    //------------------------------------- category -------------------------------------

    createCategory(name: string, description: string): any

    findCategory(id: string): any



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


    fetchUserAllPosts(userId: string): any


    fetchUserPosts(userId: string, active: boolean): any

    activateProduct(productId: string) : any

}

export default IRepository