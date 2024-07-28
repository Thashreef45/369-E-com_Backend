import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchOrders {


    private repository: IRepository
    private fetchAdminProducts: any
    private fetchOrdersWithIds: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchAdminProducts = dependencies.fetchAdminProducts
        this.fetchOrdersWithIds = dependencies.fetchOrdersWithIds
    }

    async execute(data: Input): Promise<Output> {


        //check credentials
        const credentials = this.checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        try {


            //fetch admin products
            const adminProducts = await this.fetchAdminProducts()


            //create array of product ids
            const productIds = this.createProductIds(adminProducts)
            // fetch  orders
            const orders = this.fetchOrdersWithIds(productIds, data.query)



            const resData = this.OrderMapper(orders, adminProducts)



            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }
        } catch (error) {

            return {
                response: { message: "Error fetching orders" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }






    /** Method for createing array of product ids */
    private createProductIds(data: { _id: string }[]) {
        return data.map(x => x._id)
    }


    /** Method for checking input credentials */
    private checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {
        if (!data.query) return {
            message: "Query is missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //checking query - valid or not
        if (data.query !== 'initiated' && data.query !== 'shipped'
            && data.query !== 'outForDelivery' && data.query !== 'cancelled' && data.query !== 'delivered'
        ) {
            return {
                message: 'Invalid order status provided. Valid statuses are: initiated, shipped, out for delivery, cancelled and delivered',
                status: StatusCode.BAD_REQUEST,
                success: false
            }
        }

        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }


    /** Method for mapping order data and attaching product data */
    OrderMapper(orders: Order[], products: Proudct[]): OrderMapperOutput[] {

        // create a object , key = id of products (for quick acccess)
        const productObj: { [key: string]: Proudct } = {};

        for (let i = 0; i < products.length; i++) {
            const id = products[i]._id.toString()
            productObj[id] = products[i]
        }

        const arr: OrderMapperOutput[] = []
        for (let i = 0; i < orders.length; i++) {
            const id = orders[i].productId.toString()
            arr.push({
                _id: orders[i]._id,
                thumbnail: productObj[id].thumbnail,
                name: productObj[id].name,

                cod: orders[i].cod,

                quantity: orders[i].quantity,
                price: orders[i].price,
                total: orders[i].price * orders[i].quantity
            })
        }

        return arr
    }
}


export default FetchOrders


interface Input {
    email: string
    query: string
}


interface Output {
    response: { message: string, data?: OrderMapperOutput[] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    fetchAdminProducts(): Promise<any>
    fetchOrdersWithIds(productIds: string[], query: string): Promise<any>
}



interface Proudct {
    _id: string
    name: string
    description: string

    price: number
    actualPrice: number

    offer: boolean
    thumbnail: string
    stock: number
    categoryId: string
    subcategoryId: string

    rating: {
        one: number
        two: number
        three: number
        four: number
        five: number
    }

    averageRating: number
}


interface Order {
    _id: string
    productId: string
    quantity: number
    price: number
    cod: boolean
    status: {
        pending: boolean

        initiated: { status: boolean, time: Date }
        shipped: { status: boolean, time: Date }
        outForDelivery: { status: boolean, time: Date }
        delivered: { status: boolean, time: Date }

        cancelled: { status: boolean, time: Date }
    }
    userId: string
    addressId: string

}


interface OrderMapperOutput {
    _id: string,
    thumbnail: string,
    name: string,
    quantity: number,
    price: number,
    total: number,
    cod: boolean
}


