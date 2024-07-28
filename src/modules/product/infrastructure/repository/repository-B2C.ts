import productModel from "../database/B2C/product-model"; // product model
import categoryModel from "../database/B2C/category-model"; // category model

import IRepository from "../interface/IRepository";
import { isValidObjectId, ObjectId, Types } from "mongoose";




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
        name: string, description: string,
        price: number, images: string[],
        thumbnail: string, stock: number, categoryId: string,
        subCategoryId: string, ownerId: string, isAdmin: boolean
    ) {

        const newProduct = new productModel({
            name, description, price, actualPrice: price, images, thumbnail,
            stock, categoryId, subcategoryId: subCategoryId,
            ownership: {
                ownerId: ownerId,
                isAdmin: isAdmin
            }
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
        price: number, actualPrice: number, offer: boolean, images: string[],
        thumbnail: string, stock: number, categoryId: string, subCategoryId: string
    }) {

        try {
            const update = await productModel.updateOne(
                { _id: data.productId },
                {
                    $set: {
                        name: data.name,
                        description: data.description,
                        actualPrice: data.actualPrice,
                        price: data.price,
                        offer: data.offer,
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



    /** product rating only */
    async productRating(data: { userId: string, productId: string, rating: number }) {
        let ratingField = '';
        if (data.rating == 1) ratingField = 'rating.one';
        else if (data.rating == 2) ratingField = 'rating.two';
        else if (data.rating == 3) ratingField = 'rating.three';
        else if (data.rating == 4) ratingField = 'rating.four';
        else if (data.rating == 5) ratingField = 'rating.five';
        else throw new Error("Invalid rating")

        try {
            const updated = productModel.updateOne(
                { _id: data.productId },
                {
                    $push: {
                        feedbacks: {
                            userId: data.userId,
                            rating: data.rating,
                        }
                    },
                    $inc: {
                        [ratingField]: 1
                    }
                }
            )
            return updated
        } catch (error) {
            throw new Error("Error rating the product")
        }
    }



    /** product rating with comment */
    async ratingWithComment(data: { userId: string, productId: string, rating: number, comment: string }) {

        let ratingField = '';
        if (data.rating == 1) ratingField = 'rating.one';
        else if (data.rating == 2) ratingField = 'rating.two';
        else if (data.rating == 3) ratingField = 'rating.three';
        else if (data.rating == 4) ratingField = 'rating.four';
        else if (data.rating == 5) ratingField = 'rating.five';
        else throw new Error("Invalid rating")

        try {
            const updated = productModel.updateOne(
                { _id: data.productId },
                {
                    $push: {
                        feedbacks: {
                            userId: data.userId,
                            rating: data.rating,
                            comment: data.comment
                        }
                    },
                    $inc: {
                        [ratingField]: 1
                    }
                }
            )
            return updated
        } catch (error) {
            throw new Error("Error rating the product")
        }
    }


    async checkOutCart(data: { productId: string, quantity: number }[]): Promise<any> {

        const productUpdates = data.map(product => ({
            updateOne: {
                filter: { _id: new Types.ObjectId(product.productId) },
                update: { $inc: { stock: -product.quantity } }
            }
        }));

        const updated = await productModel.bulkWrite(productUpdates);

        return updated
    }

    async fetchAdminProducts(): Promise<any> {
        try {
            const products = await productModel.find(
                {
                    'ownership.isAdmin': true
                },
                {
                    feedbacks : 0 , images : 0,ownership:0,
                }
            )

            return products
        } catch (error) {
            throw new Error('Error product fetching')
        }
    }

}




export default productRepository












