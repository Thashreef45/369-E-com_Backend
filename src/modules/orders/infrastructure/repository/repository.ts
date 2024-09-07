import IRepository from "../interface/IRepository"

import orderModel from '../database/order-model'
import checkOutModel from "../database/checkout-model"


class Repository implements IRepository {



    /**Create new order  */
    async createOrder(data:
        {
            products: { productId: string, quantity: number, price: number }[],
            userId: string, addressId: string, cod: boolean
        }
    ): Promise<any> {
        //create checkout model instace
        const checkout = new checkOutModel({
            addressId: data.addressId,
            userId: data.userId,
            cod: data.cod,
            status: data.cod ? 'completed' : 'pending'
        })

        await checkout.save()

        //create orders
        const orders = data.products.map(product => ({

            productId: product.productId,
            price: product.price,
            quantity: product.quantity,
            checkoutId: checkout._id,// checkoutId
            cod: data.cod,
            // status: data.cod ? 'pending' : 'initiated',
            'status.pending': !data.cod,
            'status.initiated.status': data.cod ? true : false,
            'status.initiated.time': data.cod ? Date.now() : null,

            userId: data.userId,
            addressId: data.addressId,

        }));

        // Insert orders
        await orderModel.insertMany(orders);
        return checkout
    }



    fetchADeliveredOrder(data: { userId: string, productId: string }): Promise<any> {
        const order = orderModel.findOne(
            {
                productId: data.productId,
                userId: data.userId,
                'status.delivered.status': true
            }
        )
        return order
    }



    fetchUserOrders(data: { userId: string }): Promise<any> {
        const orders = orderModel.find(
            {
                userId: data.userId,
                "status.pending": false
            }
        )

        return orders
    }


    /** Fetch order by orderId */
    fetchOrder(data: { orderId: string }): Promise<any> {

        try {
            const order = orderModel.findOne({ _id: data.orderId, 'status.pending': false })
            return order
        } catch (error) {
            throw new Error('Error fetching orders')
        }

    }


    /** Fetch orders with product ids and orders status */
    async fetchOrdersWithProductIds(data:
        { productIds: string[], status: string, startDate?: string, endDate?: string, page_no?: number, limit?: number }
    ): Promise<any> {

        try {

            // const status = `status.${data.status}.status` // creating status
            const { query, limit, skip } = createQuery(data) // ****************

            const orders = await orderModel.find(query).skip(skip).limit(limit)

            // const orders = await orderModel.find(
            //     { productId: { $in: data.productIds }, [status]: true },
            //     //todo : not checking its future status is true or not
            // )

            return orders
        } catch (error) {
            throw new Error('Error fetching pending orders')
        }

    }



    /** Cancel order */
    async cancelOrder(orderId: string): Promise<any> {

        const updated = await orderModel.updateOne(
            { _id: orderId },
            {
                $set: {
                    'status.cancelled.status': true,
                    'status.cancelled.time': new Date()
                }
            }
        )
    }


    /** Update order status shipped (params- *orderId)*/
    async updateOrderShipped(orderId: string): Promise<any> {
        const updated = await orderModel.updateOne(
            { _id: orderId },
            {
                $set: {
                    'status.shipped.status': true,
                    'status.shipped.time': Date.now()
                }
            }
        )
    }

    
    /** Update order status outForDelivery (params- *orderId)*/
    async updateOrderOutForDelivery(orderId: string): Promise<any> {
        const updated = await orderModel.updateOne(
            { _id: orderId },
            {
                $set: {
                    'status.outForDelivery.status': true,
                    'status.outForDelivery.time': Date.now()
                }
            }
        )
    }


    /** Update order status delivered (params- *orderId)*/
    async updateOrderDelivered(orderId: string): Promise<any> {
        const updated = await orderModel.updateOne(
            { _id: orderId },
            {
                $set: {
                    'status.delivered.status': true,
                    'status.delivered.time': Date.now()
                }
            }
        )
    }


}

export default Repository




// Function create query for fetching orders
const createQuery = (data: { productIds: string[], status: string, startDate?: string, endDate?: string, page_no?: number, limit?: number }) => {

    const query: any = {}

    query[`status.${data.status}.status`] = true
    query.productId = { $in: data.productIds }

    if (data.status == 'initiated') {
        query[`status.shipped.status`] = false
        query[`status.cancelled.status`] = false
    }

    if (data.status == 'shipped') {
        query[`status.outForDelivery.status`] = false
        query[`status.cancelled.status`] = false
    }

    if (data.status == 'outForDelivery') {
        query[`status.delivered.status`] = false
        query[`status.cancelled.status`] = false
    }


    if (data.startDate || data.endDate) {
        query.updatedAt = {}
        if (data.startDate) {
            query.updatedAt.$gte = new Date(data.startDate)
        }
        if (data.endDate) {
            query.updatedAt.$lte = new Date(data.endDate)
        }
    }

    const pageNo = data.page_no || 1
    const limit = data.limit || 10
    const skip = (pageNo - 1) * limit

    return { query, skip, limit }
};


interface Status {
    pending: Boolean,
    initiated: { status: boolean, time: Date },
    shipped: { status: boolean, time: Date },
    outForDelivery: { status: boolean, time: Date },
    delivered: { status: boolean, time: Date },
    cancelled: { status: boolean, time: Date },
}