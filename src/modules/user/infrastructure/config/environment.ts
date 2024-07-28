import environment from "../../../../infrastructure/environment";

const env = {
    JWT_SIGNATURE : environment.JWT_SIGNATURE as string,
    OTP_JWT_SIGNATURE : environment.OTP_JWT_SIGNATURE as string
}

export default env