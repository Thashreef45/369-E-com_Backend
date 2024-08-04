import StatusCode from "../../infrastructure/config/status-code"
import IRepository from "../../infrastructure/interface/IRepository"


class FetchOrders {

    private repository: IRepository
    private getProductsById: (productIds: string[]) => Promise<any>
    private fetchUserOrders: (userId: string) => Promise<any>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProductsById = dependencies.getProductsById
        this.fetchUserOrders = dependencies.fetchUserOrders
    }


    async execute(data: Input): Promise<Output> {
        try {


            //fetch user
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }

            const orders = await this.fetchUserOrders(user._id)
            if (!orders.length) return {
                response: { message: "No orders found" },
                status: StatusCode.OK
            }

            const resData = await this.OrderMapping(orders, user._id)
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



    /** Method will map orders and attach it with product thumbnail */
    private async OrderMapping(orders: Order[], userId: string): Promise<MappedData[]> {

        //create array product ids
        const productIds = this.createProductIds(orders)
        const products: { _id: string, thumbnail: string, name: string }[] = await this.getProductsById(productIds)


        // Array declaration
        const arr: MappedData[] = [];

        // Create a Map for quick lookup of products by their _id --- Declaration
        const productMap = new Map<string, { name: string; thumbnail: string }>();


        // Populate the productMap with product data
        for (const product of products) {
            productMap.set(String(product._id), { name: product.name, thumbnail: product.thumbnail });
        }

        for (const order of orders) {
            const product = productMap.get(String(order.productId));
            if (product) {
                arr.push({
                    _id: order._id, // string
                    name: product.name, // string
                    thumbnail: product.thumbnail, // string
                    price: order.price, // number
                    quantity: order.quantity, // number
                    status: order.status, // OrderStatus - (interface)
                });
            }
        }

        return arr;

    }


    private createProductIds(data: { productId: string, }[]) {
        return data.map(x => x.productId)
    }
}


export default FetchOrders


interface Input {
    phone: string
}


interface Output {
    response: { message: string, data?: MappedData[] },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository,
    getProductsById(productIds: string[]): Promise<any>,
    fetchUserOrders(userId: string): Promise<any>
}

interface Order {
    _id: string,
    productId: string,
    quantity: number,
    price: number,
    status: OrderStatus
    addressId: string
}



interface MappedData {
    _id: string
    name: string
    thumbnail: string
    price: number
    quantity: number
    status: OrderStatus
}

interface OrderStatus {
    pending: boolean,
    initiated: { status: boolean, time: Date },
    shipped: { status: boolean, time: Date },
    outForDelivery: { status: boolean, time: Date },
    delivered: { status: boolean, time: Date },
    cancelled: { status: boolean, time: Date },
}