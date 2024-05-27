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

    // find a category 
    async getCategory(name:string) {
        const result  = await categoryModel.findOne({name:name})
        return result
    }
    

    // create sub category 
    async createSubCategory(
        id: string,
        subcategory: { name: string, subcategory: { name: string, description: string } }
    ) {
        const updated = await categoryModel.updateOne(
            { _id: id },
            {
                $push: {
                    subcategories: subcategory
                }
            }
        )
    }





    //------------------------------------- PRODUCT -------------------------------------

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












