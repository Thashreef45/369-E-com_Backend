import * as userConsumer from '../../../../../../modules/user/app/handler/communication/consumer/vendor-consumer'


export const fetchUserByPhone = async(phone:string) => {
    const user = await userConsumer.fetchUserByPhone(phone)
    return user
}