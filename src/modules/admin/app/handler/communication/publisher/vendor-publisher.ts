import * as vendorConsumer from '../../../../../vendor/app/handler/communication/consumer/admin-consumer'

export const fetchVendorApprovals = async() : Promise<any> => {

    const output = await vendorConsumer.fetchVendorApprovals()
    return output
}



export const fetchAVendor = async(vendorId:string) : Promise<any> => {
    
    const output = await vendorConsumer.fetchAVendor(vendorId)
    return output

}



export const activateVendor = async(vendorId:string) : Promise<any> => {
    
    const output = await vendorConsumer.activateVendor(vendorId)
    return output

}