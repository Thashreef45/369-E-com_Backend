import * as vendorConsumer from '../../../../vendor/app/handler/communication/consumer/product-consumer'


/** Fetch admin with id */
export const fetchVendor = async (id: string): Promise<any> => {

    const output = await vendorConsumer.fetchVendorWithId(id)
    return output
}
