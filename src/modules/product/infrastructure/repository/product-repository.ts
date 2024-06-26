import productModel from "../database/product-model"; // product model
import categoryModel from "../database/category-model"; // category model

import IRepository from "../interface/IRepository";

class productRepository implements IRepository {

    //------------------------------------- CATEGORY -------------------------------------

    //create category
    async createCategory(name: string, description: string) {
        const newCategory = await categoryModel.create({
            name, description,
        })

        const updated = await newCategory.save()
    }

    // find a category by name 
    async getCategory(name: string) {
        const result = await categoryModel.findOne({ name: name })
        return result
    }

    /*find a category by its _id */
    async getCategoryById(id: string) {
        const result = await categoryModel.findOne({ _id: id })
        return result
    }


    // create sub category 
    async createSubCategory(id: string, subcategory: { name: string, description: string }) {
        const updated = await categoryModel.updateOne(
            { _id: id },
            {
                $push: {
                    subcategories: subcategory
                }
            }
        )
    }


    // fetch all categories
    async fetchAllCategories() {
        const updated = await categoryModel.find()
        return updated
    }





    //------------------------------------- PRODUCT -------------------------------------

    //create new product
    async createProduct(
        name: String, description: String,
        price: Number, images: String[],
        thumbnail: String, stock: Number,
        categoryId : String,subCategoryId : String
    ) {

        const newProduct = await new productModel({
            name, description, price, images, thumbnail, stock ,categoryId ,subCategoryId 
        })

        const updated = await newProduct.save()
    }


    // fetch a single product
    async getProduct(id: string) {
        return await productModel.findOne({ _id: id })
    }

    // fetch mulitiple products by id
    async getProducts(data: string[]) {
        return await productModel.find({ _id: { $in: data } })
    }

    
    // fetch every products
    async getAllProducts() {
        return await productModel.find()
    }


}



export default productRepository












