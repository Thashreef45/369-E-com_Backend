import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class UpdateOrder {

    private repository: IRepository
    private updateOrder: (data: { ownerId: string, orderId: string }) => Promise<Output>

    constructor(dependencies: Dependencies) {

        this.repository = dependencies.repository
        this.updateOrder = dependencies.updateOrder
    }

    async execute(data: Input): Promise<Output> {


        //fetch vendor
        const vendor = await this.repository.fetchVendorWithEmail(data.email)
        if (!vendor) return {
            response: { message: "Vendor not found" },
            status: StatusCode.NOT_FOUND
        }


        // updated order
        const updated = await this.updateOrder({ ownerId: vendor._id, orderId: data.orderId })
        return { 
            response : updated.response,
            status : updated.status
        }
    }
}


export default UpdateOrder


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Input {
    email: string
    orderId: string
}

interface Dependencies {
    repository: IRepository
    updateOrder(data: { ownerId: string, orderId: string }): Promise<Output>
}
