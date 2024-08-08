import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchOrders {


    // private repository: IRepository
    private fetchAdminProducts: any
    private fetchOrdersWithIds: any

    constructor(dependencies: Dependencies) {
        // this.repository = dependencies.repository
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
            const adminProducts = await this.fetchAdminProducts({})



            //create array of product ids
            const productIds = this.createProductIds(adminProducts)


            //params for fetching orders
            const params = {
                productIds, status: data.status, startDate: data.startDate,
                endDate: data.endDate, page_no: data.page_no, limit: data.limit
            }
            // fetch  orders
            const orders = await this.fetchOrdersWithIds(params)



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
    private createProductIds(data: { _id: string }[]): string[] {
        return data.map(x => x._id)
    }


    /** Method for checking input credentials */
    private checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {
        if (!data.status) return {
            message: "Status is missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check status valid or not
        const validStatuses = ['initiated', 'shipped', 'outForDelivery', 'cancelled', 'delivered']
        //checking status - valid or not
        if (!validStatuses.includes(data.status)) return {
            message: 'Invalid order status provided. Valid statuses are: initiated, shipped, out for delivery, cancelled and delivered',
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //validate Date
        const validDates = this.ValidateDate(data)
        if (!validDates.success) return {
            message: validDates.message,
            status: validDates.status,
            success: validDates.success
        }


        //check limit 
        if (data.limit && isNaN(data.limit)) return {
            message: "Invalid limit value. It must be a number.",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check page_no
        if (data.page_no && isNaN(data.page_no)) return {
            message: "Invalid page_number. It must be a number.",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }



    /** Method validates the dates */
    private ValidateDate(data: { startDate?: string, endDate?: string }): { message: string, status: StatusCode, success: boolean } {

        if (data.startDate || data.endDate) {
            let startDate: any, endDate: any;

            if (data.startDate) {
                startDate = new Date(data.startDate as string)
                if (isNaN(startDate.getTime())) return {
                    message: "Invalid start date format",
                    status: StatusCode.BAD_REQUEST,
                    success: false
                };
            }

            if (data.endDate) {
                endDate = new Date(data.endDate as string)
                if (isNaN(endDate.getTime())) return {
                    message: "Invalid end date format",
                    status: StatusCode.BAD_REQUEST,
                    success: false
                };
            }

            // Optional: Check if startDate > endDate
            if (startDate && endDate && startDate > endDate) return {
                message: "Start date cannot be after end date",
                status: StatusCode.BAD_REQUEST,
                success: false
            };

            // Proceed with further logic using valid startDate and endDate
        }

        // default
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
    status: string

    startDate?: string;
    endDate?: string;
    page_no?: number;
    limit?: number;
}

interface Output {
    response: { message: string, data?: OrderMapperOutput[] },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository

    fetchAdminProducts({}): Promise<any>

    fetchOrdersWithIds(data:
        {
            productIds: string[], status: string, startDate?: string,
            endDate?: string, page_no?: number, limit?: number;
        }
    ): Promise<Order[]>

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


