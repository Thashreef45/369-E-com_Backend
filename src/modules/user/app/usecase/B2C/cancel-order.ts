import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class CancelOrder {

    private repository: IRepository
    private cancelOrder: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.cancelOrder = dependencies.cancelOrder
    }

    async execute(data: Input): Promise<Output> {


        //check input credential
        if (!data.orderId || typeof data.orderId != 'string') return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


        try {


            //fetch user
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            // updated 
            const updated: Output = await this.cancelOrder({ orderId: data.orderId, userId: user._id })
            return {
                response: updated.response,
                status: updated.status
            }


        } catch (error) {
            return {
                response: { message: "Error canceling order" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }



}

// cancelOrder



export default CancelOrder


interface Input {
    phone: string,
    orderId: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    cancelOrder(data: { orderId: string, userId: string }): Promise<any>
}