import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAOrder {

    private repository: IRepository
    private fetchOrder: (orderId: string) => Promise<Order>
    private fetchProduct: (productId: string) => Promise<Proudct>
    private fetchUser: (userId: string) => Promise<any>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository

        this.fetchOrder = dependencies.fetchOrder
        this.fetchProduct = dependencies.fetchProduct
        this.fetchUser = dependencies.fetchUser
    }

    async execute(data: Input): Promise<Output> {

        // check input credentials
        if (!data.orderId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            //fetch vendor 
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }

            //fetch order
            const order = await this.fetchOrder(data.orderId)
            if (!order) return {
                response: { message: "Order not found" },
                status: StatusCode.NOT_FOUND
            }


            //// This checking is not that important--------------------
            //// already checking product is valid or not while ordering
            const product = await this.fetchProduct(order.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }

            //check ownership of the product
            if (String(vendor._id) != String(product.ownership.ownerId)) return {
                response: { message: "You do not have permission to access this order" },
                status: StatusCode.FORBIDDEN
            }


            const user = await this.fetchUser(order.userId)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            const resData = this.OrderMapper(user, order, product)
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }


        } catch (error) {
            return {
                response: { message: "Error fetching order" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    private OrderMapper(user: User, order: Order, product: Proudct): MappedOrder {

        const address = this.findAddress(user.address, order.addressId)
        return {
            _id: order._id,
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
            price: order.price,
            quantity: order.quantity,
            productId: order.productId,
            cod: order.cod,
            status: order.status,
            address: address
        }
    }



    private findAddress(address: Address[], addressId: string): Address {
        return address.filter(x => String(x._id) == String(addressId))[0]
    }

}



export default FetchAOrder

interface Input {
    email: string
    orderId: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {

    repository: IRepository
    fetchOrder(orderId: string): Promise<Order>
    fetchProduct(productId: string): Promise<Proudct>
    fetchUser(userId: string): Promise<any>
}

interface MappedOrder {
    _id: string,
    name: string,
    description: string,
    thumbnail: string
    // checkoutId: string 
    productId: string,
    quantity: number,
    price: number,

    cod: boolean,
    status: OrderStatus
    address: Address
}


interface Proudct {
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
    feedbacks: { userId: string, rating: number, comment: string }[],
    ownership: {
        isAdmin: boolean,
        ownerId: string,
    }
}


interface User {
    name: string,
    dob: string,
    phone: string,

    // membership
    // membership: {
    //     purchased: string[]
    // },

    address: Address[]

    cart: { productId: string, quantity: number }[],
    wishlist: string[],

    otp: string
}

interface Address {
    _id: string
    name: string,
    address: string,
    phone: string,
    pin: string,
    // active: boolean
}



interface Order {
    _id: string,

    checkoutId: string
    productId: string,
    quantity: number,
    price: number,

    cod: boolean,
    status: OrderStatus

    userId: string
    addressId: string
}

interface OrderStatus {
    pending: boolean,
    initiated: { status: boolean, time: Date },
    shipped: { status: boolean, time: Date },
    outForDelivery: { status: boolean, time: Date },
    delivered: { status: boolean, time: Date },
    cancelled: { status: boolean, time: Date },
}