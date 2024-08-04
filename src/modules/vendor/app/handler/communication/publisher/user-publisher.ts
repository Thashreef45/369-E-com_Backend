import * as userConsumer from '../../../../../../modules/user/app/handler/communication/consumer/vendor-consumer'


export const fetchUserByPhone = async(phone:string) => {
    const user = await userConsumer.fetchUserByPhone(phone)
    return user
}


export const fetchUserById = async(id:string) => {
    const user = await userConsumer.fetchUserById(id)
    return user
}