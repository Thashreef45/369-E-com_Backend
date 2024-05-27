import SendSms from "../../../infrastructure/services/send-sms" // sms service
import sendOtp from '../../usecase/user/login-signup-otp' // usecase


export const LoginSignupOtp = (phone:string, otp : string) => {

    const dependencies = {
        sendSms : SendSms
    }
    const data = {
        to : phone,
        otp
    }

    const interactor = new sendOtp(dependencies)
    interactor.execute(data)
}



