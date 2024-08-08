import * as vendorConsumer from '../../../../../notification/app/handler/event-handlers/vendor' 






export const sendOtpToEmail = (otp:string,email:string) => {
    // logic have to implement here
    const data = {otp,email}
    vendorConsumer.sendOtp(data)
}