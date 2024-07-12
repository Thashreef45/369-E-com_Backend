import productModel from "../database/e-com/product-model"; // product model
import categoryModel from "../database/e-com/category-model"; // category model

import IRepository from "../interface/IRepository";
import { isValidObjectId } from "mongoose";

class productRepository implements IRepository {

    //------------------------------------- CATEGORY -------------------------------------


    //create category
    async createCategory(name: string, description: string) {
        const newCategory = await categoryModel.create({
            name, description,
        })

        const updated = await newCategory.save()
        return updated
    }

    // find a category by name 
    async getCategory(name: string) {
        const result = await categoryModel.findOne({ name: name })
        return result
    }


    /*find a category by its _id */
    async getCategoryById(id: string) {
        try {
            const result = await categoryModel.findOne({ _id: id })
            return result

        } catch (error) {
            throw new Error("Erro fetching category")
        }
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
        return updated
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
        categoryId: String, subCategoryId: String
    ) {

        const newProduct = new productModel({
            name, description, price, actualPrice: price, images, thumbnail,
            stock, categoryId, subcategoryId: subCategoryId
        })

        const updated = await newProduct.save()
        return newProduct
    }




    // fetch a single product by id
    async getProduct(id: string) {
        return await productModel.findOne({ _id: id })
    }


    // fetch a single product by name
    async getProductByName(name: string) {
        return await productModel.findOne({ name })
    }



    // fetch mulitiple products by id
    async getProducts(data: string[]) {
        return await productModel.find({ _id: { $in: data } }, { feedbacks: 0 }).lean()
    }



    // fetch every products
    async getAllProducts() {
        return await productModel.find({}, { feedbacks: 0 })
    }


    async updateProduct(data: {
        productId: string, name: string, description: string,
        price: number, images: string[], thumbnail: string,
        stock: number, categoryId: string, subCategoryId: string
    }) {

        try {
            const update = await productModel.updateOne(
                { _id: data.productId },
                {
                    $set: {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        stock: data.stock,
                        images: data.images,
                        thumbnail: data.thumbnail,
                        categoryId: data.categoryId,
                        subcategoryId: data.subCategoryId,
                    }
                }
            )
            return update
        } catch (error) {
            throw new Error("Error updating product")
        }

    }


}



export default productRepository












