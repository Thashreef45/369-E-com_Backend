import { Request, Response } from "express"
import StatusCode from "../../infrastructure/config/status-code"



// hadles the token , refreshToken
const responseHandler = (req: Request, res: Response, data: Data) => {


    if (req.body.accessToken && req.body.refreshToken) {
        // Attach the tokens to the response data
        data.response.accessToken = req.body.accessToken;
        data.response.refreshToken = req.body.refreshToken;
    }


    // response
    res.status(data.status).json(data.response)

}


interface Data {
    response: { message: string, accessToken?: string, refreshToken?: string },
    status: StatusCode
}


export default responseHandler