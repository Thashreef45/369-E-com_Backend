import IRepository from "../interface/IRepository"

import orderModel from '../database/order-model'
import checkOutModel from "../database/checkout-model"


class Repository implements IRepository {



    /**Create new order  */
    async checkOutCart(data:
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



    // fetch order


    //update order



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

        const order = orderModel.findOne({ _id: data.orderId, 'status.pending': false })
        return order

    }


    /** Fetch orders with product ids and orders status */
    fetchOrdersWithProductIds(data: { productIds: string[], query: string }): Promise<any> {
        const status = `status.${data.query}.status`
        const orders = orderModel.find(
            { productId: { $in: data.productIds }, [status]: true },
        )

        return orders
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


}

export default Repository