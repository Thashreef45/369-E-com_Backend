import * as productConsumer from '../../../product/app/handler/event-handlers/order-consumer'


/** Fetch product with productId */
export const fetchProduct = async (productId: string): Promise<any> => {

    const output = await productConsumer.fetchProduct(productId)
    return output
}