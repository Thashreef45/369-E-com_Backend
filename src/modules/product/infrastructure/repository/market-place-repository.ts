import IRepository from "../interface/IRepository-B2B";

import productModel from "../database/market-place/product-model"; // product model
import categoryModel from "../database/market-place/category-model"; // category model



class MarketPlaceRepository implements IRepository {

    // onwork *2
    async createCategory(data) {
        try {

            const newCategory = await categoryModel.create({
                name: data.name,
                description: data.description
            })
            return newCategory

        } catch (error) {
            throw new Error("Error creating product")
        }
    }

    async findCategory(id: string) {
        const category = await categoryModel.findOne({ _id: id })
        return category
    }

    // async fetchCategories () {

    // }


    // on work *1
    // create a new product | post
    async createProduct(data) {
        try {

            const newProduct = await productModel.create({
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                thumbnail: data.thumbnail,
                images: data.images,
                categoryId: data.categoryId,
                userId: data.userId,
            })

            return newProduct

        } catch (error) {
            throw new Error("Error creating product")
        }
    }


    // on work *3
    // fetch a product active its with id 
    async findProduct(id: string) {
        try {
            const product = await productModel.findOne({ _id: id, active: true })
            return product
        } catch (error) {
            throw new Error("Error finding product")
        }
    }



    // on work *4
    async updateProduct(name: string, description: string,
        price: number, thumbnail: string, images: string[],
        categoryId: string, productId: string) {

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
        } catch (error) {
            throw new Error("Error updating product")
        }

    }



    // on work *5
    // remove product || update as active=false
    async removeProduct(productId: string) {

        try {
            const updated = productModel.updateOne(
                { _id: productId },
                {
                    $set: { active: false }
                }
            )
            return updated
        } catch (error) {
            throw new Error("Error updating product")
        }

    }


    //fetching user all posts
    async fetchUserAllPosts(userId: string) {
        try {
            const posts = await productModel.find({ userId: userId })
        } catch (error) {
            throw new Error("Error fetching product")
        }
    }



    //fetching user filtered (active : true/false) posts 
    async fetchUserPosts(userId: string, active: boolean) {
        try {
            const posts = await productModel.find({ userId: userId, active: active })
        } catch (error) {
            throw new Error("Error fetching product")
        }
    }


    //activate product
    async activateProduct(productId: string) {
        try {
            const update = await productModel.updateOne(
                { _id: productId },
                {
                    $set: { active: true }
                }
            )

            return update
        } catch (error) {
            throw new Error("Error updating product")
        }
    }

    // async fetchProducts () {

    // }
}


export default MarketPlaceRepository