import categoryModel from "../database/Services/category-model";
import serviceModel from "../database/Services/service-model";

import IRepository from "../interface/IRepository-services";



class ServiceRepository implements IRepository {

    // ======================= Category =======================
    async createCategory(data: { name: string, description: string }): Promise<any> {
        try {
            const created = await categoryModel.create({
                // ...data
                name: data.name,
                description: data.description
            })
            return created
        } catch (error: any) {
            throw new Error("Error creating category")
        }
    }


    async updateCategory(data: { categoryId: string; name: string; description: string; }): Promise<any> {
        try {
            const updated = await categoryModel.updateOne(
                { _id: data.categoryId },
                {
                    $set: {
                        name: data.name,
                        description: data.description
                    }
                }
            )
        } catch (error: any) {
            throw new Error("Error updating category")
        }
    }

    async createSubCategory(data: { categoryId: string; name: string; description: string; }): Promise<any> {

        try {
            const updated = await categoryModel.updateOne(
                { _id: data.categoryId },
                {
                    $push: {
                        subcategories: { name: data.name, description: data.description }
                    }
                }
            )
            return updated
        } catch (error: any) {
            throw new Error("Error creating sub-category")
        }
    }

    /** Update sub-category */
    async updateSubCategory(data:
        {
            categoryId: string, subCategoryId: string; name: string; description: string
        }
    ): Promise<any> {
        try {
            const updated = await categoryModel.updateOne(
                { _id: data.categoryId, 'subcategories._id': data.subCategoryId },
                {
                    $set: {
                        'subcategories.$.name': data.name,
                        'subcategories.$.description': data.description
                    }
                }
            )
            return updated
        } catch (error: any) {
            throw new Error("Error updating sub-category")
        }
    }

    /** Fetch Category by its id */
    async fetchCategoryById(categoryId: string): Promise<any> {
        try {
            const category = await categoryModel.findOne({ _id: categoryId })
            return category
        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }

    /** Fetch Category by its name */
    async fetchCategoryByName(name: string): Promise<any> {
        try {
            const category = await categoryModel.findOne({ name: name })
            return category
        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }


    async fetchCategoryBySubCategoryId(id: string): Promise<any> {
        try {
            const category = await categoryModel.findOne(
                { 'subcategories._id': id }
            )
            return category
        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }


    async fetchAllCategories(): Promise<any> {
        try {
            const categories = await categoryModel.find()
            return categories
        } catch (error) {
            throw new Error("Error fetching categories")
        }
    }


    // ======================= Service =======================



    /** Create new service */
    async createService(data:
        {
            name: string; description: string; thumbnail: string; images: string[];
            categoryId: string; subcategoryId: string; ownerId: string;
        }
    ): Promise<any> {

        try {
            const service = await serviceModel.create(
                {
                    name: data.name,
                    description: data.description,
                    thumbnail: data.thumbnail,
                    images: data.images,
                    categoryId: data.categoryId,
                    subcategoryId: data.subcategoryId,
                    ownerId: data.ownerId
                }
            )
            return service

        } catch (error) {
            throw new Error("Error creating sub-category")
        }
    }




    /** Update service */
    async updateService(data:
        {
            serviceId: string; name: string; description: string; thumbnail: string;
            images: string[]; categoryId: string; subcategoryId: string
        }
    ): Promise<any> {
        try {
            const updated = await serviceModel.updateOne(
                { _id: data.serviceId },
                {
                    $set: {
                        name: data.name,
                        description: data.description,
                        thumbnail: data.thumbnail,
                        images: data.images,
                        categoryId: data.categoryId,
                        subcategoryId: data.subcategoryId,
                    }
                }
            )
        } catch (error) {
            throw new Error("Error updating service")
        }
    }


    async activateService(serviceId: string): Promise<any> {
        try {

            const updated = await serviceModel.updateOne(
                { _id: serviceId },
                {
                    $set: { active: true }
                }
            )

            return updated
        } catch (error) {
            throw new Error("Error updating service")

        }
    }

    async deactivateService(serviceId: string): Promise<any> {
        try {

            const updated = await serviceModel.updateOne(
                { _id: serviceId },
                {
                    $set: { active: false }
                }
            )
            return updated
        } catch (error) {
            throw new Error("Error updating service")

        }
    }


    async fetchAServiceById(serviceId: string): Promise<any> {

    }

    async fetchAServiceByName(name: string): Promise<any> {

    }


    async fetchAllService(query: any): Promise<any> {

    }


    /** Fetch all services by ownerId for *vendor/admin */
    async fetchAllServiceByOwnerId(data:
        {
            ownerId: string; query: { category?: string; query?: string; subCategory?: string; }
        }
    ): Promise<any> {

        const Queryfilter = createOwnerQuery(data)

        const projection = { images: 0 }

        const services = await serviceModel.find(Queryfilter).select(projection)
        return services
    }

}


export default ServiceRepository



/** Function creates Query for fetchall Services */
const createOwnerQuery = (data:
    {
        ownerId: string; query: { category?: string; query?: string; subCategory?: string; }
    }
) => {

    const { ownerId, query } = data;

    // Initialize the filter object with the ownerId
    const filter: any = { ownerId };

    // Add filters based on optional parameters
    if (query.category) {
        filter.categoryId = query.category;
    }

    if (query.subCategory) {
        filter.subcategoryId = query.subCategory;
    }

    if (query.query) {
        filter.$or = [
            { name: { $regex: query.query, $options: 'i' } },  //  * 'i' handles Case-insensitive
            { description: { $regex: query.query, $options: 'i' } }
        ];
    }

    return filter;
}