import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from '../../../infrastructure/config/staus-code'



class CheckoutCart {


    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }



    async execute(data: Input): Promise<Output> {

        try {

            const order = await this.repository.checkOutCart(data)
            const total = this.calculateTotalAmount(data.products)
            return {
                response: { message: "Success", data: { orderId: order._id, total } },
                status: StatusCode.OK // have to complete work here
            }

        } catch (error) {
            return {
                response: { message: "Error creating order" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    calculateTotalAmount(data: { quantity: number, price: number }[]): number {
        let total = 0
        for (let i = 0; i < data.length; i++) {
            total += data[i].quantity * data[i].price
        }
        return total
    }

}


export default CheckoutCart

interface Input {
    userId: string,
    addressId: string,
    cod: boolean
    products: { productId: string, quantity: number, price: number }[],
}


interface Output {
    response: { message: string, data?: { orderId: string, total: number } },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}