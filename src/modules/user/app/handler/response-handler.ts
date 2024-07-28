import { Request, Response } from "express"
import StatusCode from "../../infrastructure/config/staus-code"



// hadles the token , refreshToken
const responseHandler = (req: Request, res: Response, data: Data) => {


    //check for token and refreshToken
    if (req.body?.token) {

        //attaching token and refreshToken
        data.response = {
            ...data.response,
            token: req.body.token,
            refreshToken: req.body.refreshToken
        }

    }


    // response
    res.status(data.status).json(data.response)

}


interface Data {
    response: { message: string, token?: string, refreshToken?: string },
    status: StatusCode
}


export default responseHandler