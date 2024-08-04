

import StatusCode from "../../../infrastructure/config/staus-code"


class ActivateVendor {

    private activateVendor: (vendorId: string) => Promise<Output>
    constructor(dependencies: Dependencies) { }


    async execute(data: Input): Promise<Output> {

        try {

            if(!data.vendorId) return {
                response : { message : 'Credentials missing'},
                status : StatusCode.INTERNAL_ERROR
            }

            //update vendor
            const vendor = await this.activateVendor(data.vendorId)
            return {
                response : vendor.response,
                status : vendor.status
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
    email: string
    vendorId: string
}


interface Output {
    response: { message: string, },
    status: StatusCode
}


interface Dependencies {
    activateVendor(vendorId: string): Promise<any>
}
