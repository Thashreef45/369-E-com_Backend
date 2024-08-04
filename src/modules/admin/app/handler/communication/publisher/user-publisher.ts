import * as eventPublisher from '../../../../../user/app/handler/communication/consumer/admin-consumer'
import StatusCode from '../../../../infrastructure/config/staus-code'


export const createMembership = async (data: {
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}): Promise<any> => {

    const response = await eventPublisher.createMembership(data)
    return response

}


export const updateMembership = async (data: {
    membershipId: string,
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}) : Promise<any> => {

    const response = await eventPublisher.updateMembership(data)
    return response
}




export const fetchUserById = async (userId: string): Promise<any> => {

    const response = await eventPublisher.fetchUser(userId)
    return response
}




