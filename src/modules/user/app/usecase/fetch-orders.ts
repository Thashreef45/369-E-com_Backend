import StatusCode from "../../infrastructure/config/status-code"
import IRepository from "../../infrastructure/interface/IRepository"


class FetchOrders {

    private repository: IRepository
    private getProductsById: any
    private fetchUserOrders: any

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

            const orders = this.fetchUserOrders(user._id)
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
    private async OrderMapping(orders: {
        _id: string,
        productId: string,
        quantity: number,
        price: number,
        status: string
        // status: ['initiated', 'shipped', 'out for delivery', 'delivered', 'cancelled'] -->* enum on db
    }[], userId: string): Promise<MappedData[]> {


        //create array product ids
        const productIds = this.createProductIds(orders)
        const products: { _id: string, thumbnail: string, name: string }[] = await this.getProductsById(productIds)



        //array declaration
        const arr: MappedData[] = []

        for (let i = 0; i < orders.length; i++) {

            for (let j = 0; j < products.length; j++) {

                if (String(orders[i].productId) == String(products[j]._id)) {
                    arr.push({
                        _id: orders[i]._id, // string

                        name: products[j].name, //string
                        thumbnail: products[j].thumbnail, //string
                        price: orders[i].price, //number
                        quantity: orders[i].quantity, //number
                        status: orders[i].status, //string

                    })
                }
            }
        }

        return arr

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


interface MappedData {
    _id: string
    name: string
    thumbnail: string
    price: number
    quantity: number
    status: string
}