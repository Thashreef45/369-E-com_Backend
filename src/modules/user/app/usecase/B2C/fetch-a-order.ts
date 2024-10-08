import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAOrder {

    private repository: IRepository
    private fetchProduct: any

    private fetchOrder: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchProduct = dependencies.fetchProduct
        this.fetchOrder = dependencies.fetchOrder
    }

    async execute(data: Input): Promise<Output> {



        // fetch user
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: "User not found" },
            status: StatusCode.NOT_FOUND
        }

        // fetch order
        const order: Order = await this.fetchOrder(data.orderId)
        if (!order) return {
            response: { message: "Order not found" },
            status: StatusCode.NOT_FOUND
        }

        // check that order belongs to the same user
        if (String(order.userId) != String(user._id)) return {
            response: { message: "You do not have permission to access this order" },
            status: StatusCode.FORBIDDEN
        }


        const resData = await this.orderMapper(order, user.address)
        return {
            response: { message: "Success", data: resData },
            status: StatusCode.OK
        }
    }


    /** Method for mapping order data and attaching product thumbnail*/
    private async orderMapper(data: Order, address: Address[]): Promise<MappedData> {

        const product: {
            name: string, description: string, thumbnail: string
        } = await this.fetchProduct(data.productId)


        //filtering address
        const orderAddress = address.filter(x => String(x._id) == String(data.addressId))

        return {
            _id: data._id,
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
            price: data.price,
            quantity: data.quantity,
            status: data.status,
            address: orderAddress[0]
        }
    }
}

export default FetchAOrder

interface Input {
    phone: string
    orderId: string
}


interface Output {
    response: { message: string, data?: MappedData }
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
    fetchProduct(productId: string): Promise<any>
    fetchOrder(orderId: string): Promise<any>
}



interface Order {
    _id: string
    checkoutId: string
    productId: string,
    quantity: number,
    price: number,

    cod: boolean,

    status: OrderStatus

    userId: string
    addressId: string
}


interface MappedData {
    _id: string
    name: string
    description: string

    thumbnail: string
    price: number
    quantity: number
    status: OrderStatus
    address: Address
}


interface Address {
    _id: string
    name: String,
    address: String,
    phone: String,
    pin: String,
}

interface OrderStatus {
    pending: boolean,
    initiated: { status: boolean, time: Date },
    shipped: { status: boolean, time: Date },
    outForDelivery: { status: boolean, time: Date },
    delivered: { status: boolean, time: Date },
    cancelled: { status: boolean, time: Date },
}
