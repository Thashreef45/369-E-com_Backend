import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class CancelOrder {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {

            // updated 
            const order = await this.repository.fetchOrder({ orderId: data.orderId })
            if (!order) return {
                response: { message: 'Order not found' },
                status: StatusCode.NOT_FOUND
            }


            // check that order done by the same user
            if (String(order.userId) !== String(data.userId)) return {
                response: { message: 'Unauthorized to cancel this order' },
                status: StatusCode.UNAUTHORIZED
            }

            // check order status - is pending?
            if (order?.status?.pending) return {
                response: { message: "Cannot cancel a pending order" },
                status: StatusCode.BAD_REQUEST
            }


            // check order status - delivered ?
            if (order?.status?.delivered?.status) return {
                response: { message: "Cannot cancel a delivered order" },
                status: StatusCode.BAD_REQUEST
            }


            // update
            const updated = await this.repository.cancelOrder(data.orderId)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }


        } catch (error) {
            return {
                response: { message: "Error cancelling order" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



}

// cancelOrder



export default CancelOrder


interface Input {
    orderId: string,
    userId: string
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}