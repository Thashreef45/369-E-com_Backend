import * as adminConsumer from '../../../../admin/app/handler/communication/consumer/product-consumer'


/** Fetch admin with id */
export const FetchAdmin = (id: string): Promise<any> => {

    const output = adminConsumer.fetchAdmin(id)
    return output
}