import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class FetchSales {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {



        //check input credentials
        const credentials = this.checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }

        



        // demo
        return {
            response: { message: "", data: {} },
            status: StatusCode.OK
        }

    }



    /** Method for checking input credentials */
    checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        if (!data.startDate || !data.endDate) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        //convert to date formate
        const startDate = new Date(data.startDate as string);
        const endDate = new Date(data.endDate as string);

        //type checking 
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return{
            // return res.status(400).json({ message: 'Invalid date format.' })
            message : "Invalid date format",
            status : StatusCode.BAD_REQUEST,
            success : false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }
}


export default FetchSales

interface Input {
    email: string,
    startDate: string
    endDate: string
}


interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}