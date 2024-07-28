
interface IRepository {

    /**Create new order  */
    checkOutCart(data:
        {
            products: { productId: string, quantity: number, price: number }[],
            userId: string, addressId: string, cod: boolean
        }
    ): Promise<any>



    /** Fetch a delvered order with productId and userId  (not for common use)*/
    fetchADeliveredOrder(data: { userId: string, productId: string }): Promise<any>


    /** Fetch user orders */
    fetchUserOrders(data:{userId:string}): Promise<any>


    /** Fetch order with orderId */
    fetchOrder(data:{orderId:string}): Promise<any>


    /** Fetch orders with product ids and orders status */
    fetchOrdersWithProductIds(data:{productIds:string[],query:string}): Promise<any>


    /** Cancel order */
    cancelOrder(orderId:string): Promise<any>

}

export default IRepository