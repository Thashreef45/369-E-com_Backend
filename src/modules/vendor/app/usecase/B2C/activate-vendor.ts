import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ActivateVendor {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        try {
            // fetch vendor
            const vendor = await this.repository.fetchVendorWithId(data.vendorId)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }

            if (vendor.active) return {
                response: { message: "Vendor account is already active" },
                status: StatusCode.CONFLICT
            }


            //update
            const updated = await this.repository.activateVendor(data.vendorId)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating vendor" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


    }

}


export default ActivateVendor


interface Input {
    vendorId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}