import IRepository from "../interface/IRepository-B2B";

import productModel from "../database/B2B/product-model"; // product model
import categoryModel from "../database/B2B/category-model"; // category model



class MarketPlaceRepository implements IRepository {

    async createCategory(data: { name: string, description: string }): Promise<any> {
        try {

            const newCategory = await categoryModel.create({
                name: data.name,
                description: data.description
            })
            await newCategory.save()
            return newCategory

        } catch (error: any) {
            throw new Error("Error creating category")
        }
    }


    async createSubCategory(data:
        { categoryId: string; name: string; description: string; }
    ): Promise<any> {
        try {
            const created = await categoryModel.updateOne(
                { _id: data.categoryId },
                {
                    $push: {
                        subcategories: {
                            name: data.name,
                            description: data.description
                        }
                    }
                }
            )
        } catch (error) {
            throw new Error("Error creating sub-category")
        }
    }

    async findCategory(id: string): Promise<any> {
        try {
            const category = await categoryModel.findOne({ _id: id })
            return category

        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }


    /** Find category with its name */
    async findCategoryByName(name: string): Promise<any> {
        try {
            const category = await categoryModel.findOne({ name })
            return category

        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }

    /** Fetch Category by subcategory name  */
    async findCategoryBySubCategoryId(subCategoryId: string): Promise<any> {
        try {
            const category = await categoryModel.findOne(
                { 'subcategories._id': subCategoryId }
            )
            return category
        } catch (error: any) {
            throw new Error("Error fetching category")
        }
    }


    async fetchAllCategories(): Promise<any> {
        try {
            const data = categoryModel.find()
            return data
        } catch (error: any) {
            throw new Error('Error fetching Categories')
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////


    // on work *1
    // create a new product | post
    async createProduct(data: any): Promise<any> {
        try {

            const newProduct = await productModel.create({
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                thumbnail: data.thumbnail,
                images: data.images,
                categoryId: data.categoryId,
                ownerId: data.userId,
            })

            return newProduct

        } catch (error: any) {
            throw new Error("Error creating product")
        }
    }


    // on work *3
    /** Fetch a product active its with id  */
    async findProduct(id: string): Promise<any> {
        try {
            const product = await productModel.findOne({ _id: id, active: true })
            return product
        } catch (error: any) {
            throw new Error("Error finding product")
        }
    }


    /** Fetch a product with its id  */
    async fetchProuct(id: string): Promise<any> {
        try {
            const product = await productModel.findOne({ _id: id })
            return product
        } catch (error: any) {
            throw new Error("Error finding product")
        }
    }



    // on work *4
    async updateProduct(name: string, description: string,
        price: number, thumbnail: string, images: string[],
        categoryId: string, productId: string): Promise<any> {

        try {
            const updated = productModel.updateOne(
                { _id: productId },
                {
                    $set: {
                        name: name,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        images: images,
                        categoryId: images,
                    }
                }
            )
            return updated
        } catch (error: any) {
            throw new Error("Error updating product")
        }

    }



    // on work *5
    // remove product || update as active=false
    async removeProduct(productId: string): Promise<any> {

        try {
            const updated = productModel.updateOne(
                { _id: productId },
                {
                    $set: { active: false }
                }
            )
            return updated
        } catch (error: any) {
            throw new Error("Error updating product")
        }

    }


    //fetching user all posts
    async fetchOwnerAllPosts(ownerId: string): Promise<any> {
        try {
            const posts = await productModel.find({ ownerId: ownerId })
        } catch (error: any) {
            throw new Error("Error fetching product")
        }
    }



    //fetching user filtered (active : true/false) posts 
    async fetchOwnerPosts(ownerId: string, active: boolean): Promise<any> {
        try {
            const posts = await productModel.find({ ownerId: ownerId, active: active })
        } catch (error: any) {
            throw new Error("Error fetching product")
        }
    }


    //activate product
    async activateProduct(productId: string): Promise<any> {
        try {
            const update = await productModel.updateOne(
                { _id: productId },
                {
                    $set: { active: true }
                }
            )

            return update
        } catch (error: any) {
            throw new Error("Error updating product")
        }
    }


    async fetchAllproducts(query: Query): Promise<any> {

        const { queryObj, sortOption, skip, limitNum } = createQuery(query)
        const projection = { ownerId: 0, active: 0, images: 0 }

        const products = await productModel.find(queryObj, projection)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        return products
    }
}


export default MarketPlaceRepository


/** Function makes seach query filters to mongo query */
const createQuery = (data: Query): any => {
    const { limit, category, page_no, query, lowest_price, highest_price, sort } = data;

    // Build the query object
    let queryObj: any = {};
    if (category) queryObj.categoryId = category;
    if (query) queryObj.name = { $regex: query, $options: 'i' };
    if (lowest_price || highest_price) queryObj.price = {};
    if (lowest_price) queryObj.price.$gte = Number(lowest_price);
    if (highest_price) queryObj.price.$lte = Number(highest_price);


    // Pagination
    const limitNum = Number(limit) || 10;
    const pageNum = Number(page_no) || 1;
    const skip = (pageNum - 1) * limitNum;


    // Sorting
    let sortOption: any = {};
    if (sort) {
        switch (sort) {
            case 'price-low':
                sortOption.price = 1;
                break;
            case 'price-high':
                sortOption.price = -1;
                break;
            case 'latest':
                sortOption.createdAt = -1;
                break;
            default:
                sortOption = {}; // Default sorting (if any) can be set here
                break;
        }
    }


    return {
        queryObj, sortOption, skip, limitNum
    }
}


interface Query {
    limit?: number;
    category?: string;
    page_no?: number;
    query?: string;
    lowest_price?: number;
    highest_price?: number;
    sort?: 'price-low' | 'price-high' | 'latest';
}