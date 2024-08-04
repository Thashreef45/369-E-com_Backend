import { Request, Response } from "express"


import * as vendorPublisher from '../handler/communication/publisher/vendor-publisher'

//Repository
import AdminRepository from "../../infrastructure/repository/admin-repository"

//usecase
import FetchPemissionRequest from "../usecase/vendor/fetch-permission-requests"
import FetchAVendor from "../usecase/vendor/fetch-a-vendor"
import ActivateVendor from "../usecase/vendor/activate-vendor"





const repository = new AdminRepository()



/** Fetch all activation approval pending vendor profiles  */
export const registrationRequests = async (req: Request, res: Response) => {
    const dependencies = {
        // repository,
        fetchVendorApprovals : vendorPublisher.fetchVendorApprovals,
    }

    const data = {
        email : req.body?.email
    }

    const interactor = new FetchPemissionRequest(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




/** Fetch a profile of activation pending vendor  */
export const getARegistaraionProfile = async (req: Request, res: Response) => {
    const dependencies = {
        // repository,
        fetchVendor : vendorPublisher.fetchAVendor
    }

    const data = {
        email : req.body?.email,
        vendorId : req.params.vendorId
    }

    const interactor = new FetchAVendor(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}




/** Activate a profile of activation pending vendor  */
export const activateVendor = async (req: Request, res: Response) => {
    const dependencies = {
        activateVendor : vendorPublisher.activateVendor
    }

    const data = {
        email : req.body?.email,
        vendorId : req.body.vendorId
    }

    const interactor = new ActivateVendor(dependencies)
    const output = await interactor.execute(data)
    res.status(output.status).json(output.response)
}



/** Fetch all vendors */
export const getAllVendors = async (req: Request, res: Response) => {
    const dependencies = {
        fetchVendors : vendorPublisher.activateVendor //**wwwrk */
    }

    const data = {
        email : req.body?.email,
    }

    // const interactor = new ActivateVendor(dependencies)
    // const output = await interactor.execute(data)
    // res.status(output.status).json(output.response)
}