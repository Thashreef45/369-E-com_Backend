interface IRepository {
    //------------------------------------- category -------------------------------------
    createSubCategory(
        id: string,
        subcategory: {
        name: string, subcategory: { name: string, description: string }
    }): any

    createCategory(name: string, description: string) : any
    
    getCategory(name:string) : any


    //------------------------------------- product -------------------------------------
    getProduct(id: string): any
    getProducts(data: string[]): any
    getAllProducts(): any
}

export default IRepository