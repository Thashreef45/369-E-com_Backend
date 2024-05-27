import * as publishNotification from '../../../../../notification/app/handler/event-handlers/user'


export const sendLoginSignUpOtp = (phone:string,otp:string) => {

    publishNotification.LoginSignupOtp(phone,otp)
}