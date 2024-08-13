import { Request, Response } from "express";

//event publishers
import * as productPublisher from './communication/publisher/product-B2B-publisher'


//repository
import AdminRepository from "../../infrastructure/repository/admin-repository";

//usecase
import CreateProduct from "../usecase/B2B/create-product";
import UpdateProduct from "../usecase/B2B/update-product";
import RemoveProduct from "../usecase/B2B/remove-product";
import ActivatePost from "../usecase/B2B/activate-product";
import CreateCategory from "../usecase/B2B/create-category";
import FetchAdminProducts from "../usecase/B2B/fetch-admin-products";
import FetchAProduct from "../usecase/B2B/fetch-a-product";
import CreateSubCategory from "../usecase/B2B/create-sub-category";
import UpdateCategory from "../usecase/B2B/update-category";
import UpdateSubCategory from "../usecase/B2B/update-sub-category";
import FetchCategories from "../usecase/B2B/fetch-all-categories";



const repository = new AdminRepository()


/** Create new category -- post */
export const createCategory = async (req: Request, res: Response) => {

    const dependencies = {
        createCategory: productPublisher.createNewCategory,
        repository
    }

    const data = {
        name: req.body?.name,
        description: req.body?.description
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Create new category -- post */
export const updateCategory = async (req: Request, res: Response) => {

    const dependencies = {
        updateCategory: productPublisher.updateCategory,
    }

    const data = {
        categoryId: req.body.categoryId,
        name: req.body?.name,
        description: req.body?.description
    }

    const interactor = new UpdateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}

// updateSubCategory


/** Create new sub-category  */
export const createSubCategory = async (req: Request, res: Response) => {

    const dependencies = {
        createSubCategory: productPublisher.createSubCategory,
        repository
    }

    const data = {
        categoryId: req.body.categoryId,
        name: req.body?.name,
        description: req.body?.description
    }

    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** update a sub-category  */
export const updateSubCategory = async (req: Request, res: Response) => {

    const dependencies = {
        updateSubCategory: productPublisher.updateSubCategory,
    }

    const data = {
        subCategoryId: req.body.categoryId,
        name: req.body?.name,
        description: req.body?.description
    }

    const interactor = new UpdateSubCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


/** update a sub-category  */
export const fetchCategories = async (req: Request, res: Response) => {

    const dependencies = {
        fetchCategories: productPublisher.fetchCategories,
    }


    const interactor = new FetchCategories(dependencies)
    const output = await interactor.execute()
    res.status(output.status).json(output.response)
}


//==============================================================================



// create new product -- post
export const createProduct = async (req: Request, res: Response) => {
    const dependencies = {
        createProduct: productPublisher.createNewProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new CreateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



// update product -- patch
export const updateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        updateProduct: productPublisher.updateProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new UpdateProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


/** De activate product/post */
export const deactivateProduct = async (req: Request, res: Response) => {
    const dependencies = {
        removeProduct: productPublisher.removeProduct,
        repository
    }
    const data = { ...req.body }

    const interactor = new RemoveProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Activate product || post */
export const activatePost = async (req: Request, res: Response) => {
    const dependencies = {
        activatePost: productPublisher.acitvateProduct,
        repository
    }

    const data = {
        email: req.body.email,
        productId: req.body.productId
    }

    const interactor = new ActivatePost(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}




/** Fetch all products */
export const fetchProducts = async (req: Request, res: Response) => {

    const dependencies = {
        fetchProducts: productPublisher.fetchAdminProducts,
        repository
    }

    const data = {
        email: req.body.email,
    }

    const interactor = new FetchAdminProducts(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** Fetch a product */
export const fetchAProduct = async (req: Request, res: Response) => {

    const dependencies = {
        fetchAProduct: productPublisher.fetchAProduct,
        repository
    }

    const data = {
        email: req.body?.email,
        productId: req.params?.productId
    }

    const interactor = new FetchAProduct(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}
