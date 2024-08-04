import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class UpdateOrderStatus {

    private repository: IRepository
    private fetchProduct: (productId: string) => Promise<Product>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchProduct = dependencies.fetchProduct
    }


    async execute(data: Input): Promise<Output> {

        try {

            const order: Order = await this.repository.fetchOrder({ orderId: data.orderId })
            if (!order) return {
                response: { message: "Order not found" },
                status: StatusCode.NOT_FOUND
            }

            //* ****************
            if (order.status.pending || !order.status.initiated.status) return {
                response: { message: "Cannot update this order" },
                status: StatusCode.BAD_REQUEST
            }


            const product = await this.fetchProduct(order.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }


            const status = order.status
            //update status
            if (status.delivered.status) return {
                response: { message: "Cannot update status of delivered order" },
                status: StatusCode.CONFLICT
            }

            if (status.cancelled.status) return {
                response: { message: "Cannot update status of cancelled order" },
                status: StatusCode.CONFLICT
            }


            //check authentic access or not
            if (String(product.ownership.ownerId) != String(data.ownerId)) {
                return {
                    response: { message: "You are not authorized to update this order" },
                    status: StatusCode.UNAUTHORIZED
                }
            }

            // update order status 
            const updated = await this.updateStatusHelper(status, order._id)
            if (!updated) return {
                response: { message: "Error updating order" },
                status: StatusCode.INTERNAL_ERROR
            }

            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating order" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }




    /** Method for updating order status according to their current status */
    private async updateStatusHelper(status: OrderStatus, orderId: string): Promise<boolean> {

        try {
            if (status.shipped.status) {

                if (status.outForDelivery.status) {
                    // update to delivered
                    const updated = await this.repository.updateOrderDelivered(orderId)
                }
                else {
                    //update to outForDelivery
                    const updated = await this.repository.updateOrderOutForDelivery(orderId)
                }
            } else {
                // update to shipped
                const updated = await this.repository.updateOrderShipped(orderId)
            }
            return true
        } catch (error) {
            return false
        }

    }
}


export default UpdateOrderStatus


interface Input {
    ownerId: string,
    orderId: string
}

interface Output {
    response: { message: string, },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    fetchProduct(productId: string): Promise<Product>
}


interface Product {
    _id: string,
    name: string,
    description: string,

    price: boolean,

    actualPrice: boolean,

    offer: boolean,

    images: string[],
    thumbnail: string,
    stock: number,
    categoryId: string,
    subcategoryId: string,

    rating: {
        one: number,
        two: number,
        three: number,
        four: number,
        five: number,
    },

    averageRating: number
    // feedbacks: { userId: string, rating: number, comment: string }[],
    ownership: {
        isAdmin: boolean,
        ownerId: string,
    }
}


interface Order {
    _id: string
    checkoutId: string,
    productId: string,
    quantity: number,
    price: number,

    cod: boolean,
    status: OrderStatus,

    userId: string,
    addressId: string,
}




interface OrderStatus {

    pending: boolean,
    initiated: {
        status: boolean,
        time: Date
    },
    shipped: {
        status: boolean,
        time: Date
    },
    outForDelivery: {
        status: boolean,
        time: Date
    },
    delivered: {
        status: boolean,
        time: Date
    },
    cancelled: {
        status: boolean,
        time: Date
    },
}