

interface IRepository {

    //================================== Category ==================================

    /** Create new category */
    createCategory(data: { name: string, description: string }): Promise<any>

    /** Update a category */
    updateCategory(data: { categoryId: string, name: string, description: string }): Promise<any>

    /** Create new sub-category */
    createSubCategory(data: { categoryId: string, name: string, description: string }): Promise<any>

    /** Update a sub-category */
    updateSubCategory(data: { categoryId: string, subCategoryId: string, name: string, description: string }): Promise<any>

    fetchAllCategories(): Promise<any>

    /** fetch a category by its id */
    fetchCategoryById(categoryId: string): Promise<any>


    fetchCategoryBySubCategoryId(id: string): Promise<any>


    /** fetch a category by its name */
    fetchCategoryByName(name: string): Promise<any>





    //================================== Service ==================================


    /** Create new service */
    createService(data:
        {
            name: string, description: string, thumbnail: string, images: string[],
            categoryId: string, subcategoryId: string, ownerId: string
        }
    ): Promise<any>


    /** Update a service */
    updateService(data:
        {
            serviceId: string, name: string, description: string, thumbnail: string,
            images: string[], categoryId: string, subcategoryId: string
        }
    ): Promise<any>


    /** de-activate a service **with its id */
    deactivateService(serviceId: string): Promise<any>

    /** activate a service **with its id */
    activateService(serviceId: string): Promise<any>


    /** Fetch a service by serviceId *admin/vendors*/
    fetchAServiceById(serviceId: string): Promise<any>


    /** Fetch a service by serviceId *only if it is active */
    fetchACtiveServiceById(serviceId: string): Promise<any>



    /** Fetch a service by service name */
    fetchAServiceByName(name: string): Promise<any>


    /** Fetch all services by optional query filtration */
    fetchAllService(query:
        {
            category?: string, subCategory?: string, query?: string;
            limit?: number, page_no?: number;
        }

    ): Promise<any>


    /** Fetch all services by ownerId for *vendor/admin */
    fetchAllServiceByOwnerId(data:
        {
            ownerId: string, query: {
                category?: string, query?: string, subCategory?: string
            }
        }
    ): Promise<any>


}


export default IRepository