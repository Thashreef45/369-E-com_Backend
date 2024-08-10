import { Request, Response } from "express";

//event publishers
import * as servicePublisher from '../handler/communication/publisher/service-publisher'


//Repository
import AdminRepository from "../../infrastructure/repository/admin-repository";


//usecase
import CreateCategory from "../usecase/services/create-category";
import UpdateCategory from "../usecase/services/update-category";
import CreateSubCategory from "../usecase/services/create-sub-category";
import UpdateSubCategory from "../usecase/services/update-sub-category";
import FetchAllCategories from "../usecase/services/fetch-all-categories";
import CreateService from "../usecase/services/create-service";
import UpdateService from "../usecase/services/update-service";


const repository = new AdminRepository()


export const createCategory = async (req: Request, res: Response) => {

    const data = {
        name: req.body.name,
        description: req.body.description
    }
    const dependencies = {
        createCategory: servicePublisher.createCategory
    }

    const interactor = new CreateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Update category */
export const updateCategory = async (req: Request, res: Response) => {

    const data = {
        categoryId: req.body?.categoryId,
        name: req.body?.name,
        description: req.body?.description
    }
    const dependencies = {
        updateCategory: servicePublisher.updateCategory
    }

    const interactor = new UpdateCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




export const createSubCategory = async (req: Request, res: Response) => {
    const data = {
        categoryId: req.body?.categoryId,
        name: req.body?.name,
        description: req.body?.description
    }
    const dependencies = {
        createSubCategory: servicePublisher.createSubCategory
    }

    const interactor = new CreateSubCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}


export const updateSubCategory = async (req: Request, res: Response) => {

    const data = {
        subCategoryId: req.body?.subCategoryId,
        name: req.body?.name,
        description: req.body?.description
    }
    const dependencies = {
        updateSubCategory: servicePublisher.updateSubCategory
    }

    const interactor = new UpdateSubCategory(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** Fetch all categories */
export const fetchAllCategories = async (req: Request, res: Response) => {

    const data = {
        email: req.body?.email
    }
    const dependencies = {
        fetchAllCategories: servicePublisher.fetchAllCategories
    }

    const interactor = new FetchAllCategories(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** create new service */
export const createService = async (req: Request, res: Response) => {

    const data = {
        
        name: req.body?.name,
        description: req.body?.description,
        thumbnail: req.body?.thumbnail,
        images: req.body?.images,
        categoryId: req.body?.categoryId,
        subcategoryId: req.body?.subcategoryId,

        email: req.body?.email,
    }

    const dependencies = {
        createService: servicePublisher.createService,
        repository,
    }

    const interactor = new CreateService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}




/** update a service */
export const updateService = async (req: Request, res: Response) => {

    const data = {

        serviceId : req.body?.serviceId,
        
        name: req.body?.name,
        description: req.body?.description,
        thumbnail: req.body?.thumbnail,
        images: req.body?.images,
        categoryId: req.body?.categoryId,
        subcategoryId: req.body?.subcategoryId,

        email: req.body?.email,
    }

    const dependencies = {
        updateService: servicePublisher.updateService,
        repository,
    }

    const interactor = new UpdateService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}




/** update a service */
export const fetchAService = async (req: Request, res: Response) => {

    const data = {

        serviceId : req.body?.serviceId,
        
        name: req.body?.name,
        description: req.body?.description,
        thumbnail: req.body?.thumbnail,
        images: req.body?.images,
        categoryId: req.body?.categoryId,
        subcategoryId: req.body?.subcategoryId,

        email: req.body?.email,
    }

    const dependencies = {
        updateService: servicePublisher.updateService,
        repository,
    }

    const interactor = new UpdateService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}
