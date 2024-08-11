import { Request, Response } from "express"


// product publisher
import * as servicePublisher from '../handler/communication/publisher/service-publisher'

//response handler
import responseHandler from "./response-handler"

//usecase
import FetchCategories from "../usecase/services/fetch-categories"

import FetchAService from "../usecase/services/fetch-a-service"
import FetchAllServices from "../usecase/services/fetch-all-services"




// fetch all services || filter by queries
export const fetchAllServices = async (req: Request, res: Response) => {

    const query = {
        category: req.query?.category as string,
        subCategory: req.query?.subCategory as string,
        query: req.query?.query as string,
        limit: Number(req.query?.limit as string),
        page_no: Number(req.query?.page_no as string)
    }
    const dependencies = {
        fetchAllServices: servicePublisher.fetchAllServices
    }

    const interactor = new FetchAllServices(dependencies)
    const output = await interactor.execute(query)
    responseHandler(req, res, output)


}




/** fetch a product */
export const fetchAService = async (req: Request, res: Response) => {

    const data = {
        serviceId: req.params?.serviceId
    }
    const dependencies = {
        fetchAService: servicePublisher.fetchAService
    }

    const interactor = new FetchAService(dependencies)
    const output = await interactor.execute(data)
    responseHandler(req, res, output)
}




/** fetch all categories */
export const fetchAllCategories = async (req: Request, res: Response) => {

    const dependencies = {
        fetchAllCategories: servicePublisher.fetchAllCategories
    }

    const interactor = new FetchCategories(dependencies)
    const output = await interactor.execute()
    responseHandler(req, res, output)
}