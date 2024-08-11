import { query, Request, Response } from "express";

//event publishers
import * as servicePublisher from '../handler/communication/publisher/service-publisher'


//Repository
import Repository from '../../infrastructure/repository/repository'



//usecase
import FetchAllCategories from "../usecase/service/fetch-all-categories";

import CreateService from "../usecase/service/create-service";
import UpdateService from "../usecase/service/update-service";

import FetchAllServices from "../usecase/service/fetch-all-services";
import FetchAService from "../usecase/service/fetch-a-service";

import DeActivateService from "../usecase/service/deactivate-service"
import ActivateService from "../usecase/service/activate-service";


const repository = new Repository()




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

        serviceId: req.body?.serviceId,

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

        serviceId: req.params?.serviceId,
        email: req.body?.email,
    }

    const dependencies = {
        fetchAService: servicePublisher.fetchAService,
        repository,
    }

    const interactor = new FetchAService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** de-activate a service */
export const deactivateService = async (req: Request, res: Response) => {

    const data = {

        serviceId: req.body?.serviceId,
        email: req.body?.email,
    }

    const dependencies = {
        deactivateService: servicePublisher.deactivateService,
        repository,
    }

    const interactor = new DeActivateService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** activate a service */
export const activateService = async (req: Request, res: Response) => {

    const data = {

        serviceId: req.body?.serviceId,
        email: req.body?.email,
    }

    const dependencies = {
        activateService: servicePublisher.activateService,
        repository,
    }

    const interactor = new ActivateService(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}



/** fetch all admin services */
export const fetchAllServices = async (req: Request, res: Response) => {

    const data = {
        query: {
            category: req.query?.category as string,
            query: req.query?.query as string,
            subCategory: req.query?.subCategory as string,
        },

        email: req.body?.email,
    }

    const dependencies = {
        fetchAllServices: servicePublisher.fetchAllServices,
        repository,
    }

    const interactor = new FetchAllServices(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)

}
