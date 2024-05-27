class SendOtp {

    private sendSms

    constructor(dependencies:Dependencies){
        this.sendSms = dependencies.sendSms
    }

    execute({to,otp}:Input) {

        //content
        const content = `Hey this is DemoCompany. This is your ${otp} OTP.
        It is only valid for 5minutes`

        //sending content with otp
        this.sendSms(to,content)
    }

}

export default SendOtp


interface Input {
    to : string,
    otp : string,
}

interface Dependencies {
    sendSms(to:string,content:string):any;
}

