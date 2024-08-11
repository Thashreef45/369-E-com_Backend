import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"

class FetchProductFeedbacks {

    private getProductFeedbacks: (data: Input) => Promise<Feedback[]>
    private repository: IRepository


    constructor(dependencies: Dependencies) {
        this.getProductFeedbacks = dependencies.getProductFeedbacks
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        const credentials = this.#checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }

        try {

            //fetch feedbacks
            const feedbacks = await this.getProductFeedbacks(data)



            // map feedbacks
            const resData = await this.#DataMapper(feedbacks)


            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching feedbacks" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


    }


    /** Map Feedback data also attack with user name */
    async #DataMapper(data: Feedback[]): Promise<MappedData[]> {

        const userIds = this.#createUserIdArray(data)

        //fetch users
        const users: User[] = await this.repository.fetchUsersByIds(userIds)


        const userObj: { [key: string]: User } = {};
        for (const user of users) {
            userObj[user._id] = user
        }


        const mappedData: MappedData[] = data.map(feedback => {
            return {
                name: userObj[feedback.userId]?.name || 'Unknown',
                rating: feedback.rating,
                comment: feedback.comment,
            };
        });

        return mappedData;



    }


    /** Method creates array of user id */
    #createUserIdArray(data: Feedback[]): string[] {
        return data.map(x => x.userId)
    }

    /** Method for checking input credentials */
    #checkInputCredentials(data: Input): { message: string, success: boolean, status: StatusCode } {

        if (!data.productId) return {
            message: "Product id is not provided",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.productId.length > 25) return {
            message: "Invalid product id",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.limit && isNaN(data.limit)) return {
            message: "Invalid limit",
            status: StatusCode.BAD_REQUEST,
            success: false,
        }

        if (data.page_no && isNaN(data.page_no)) return {
            message: "Invalid page_no",
            status: StatusCode.BAD_REQUEST,
            success: false,
        }

        if (data.limit > 50) return {
            message: "limit should be less than 50",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }
}


export default FetchProductFeedbacks


interface Input {
    productId: string,
    page_no: number,
    limit: number,
    // GET /api/feedbacks?productId=123&limit=10&page_no=2
}


interface Output {
    response: { message: string, data?: MappedData[] },
    status: StatusCode
}

interface Dependencies {
    getProductFeedbacks(data: Input): Promise<Feedback[]>
    repository: IRepository
}

interface Feedback {
    userId: string;
    rating: number;
    comment: string
}

interface User {
    _id: string,
    name?: string,
    phone: string
}


interface MappedData {
    // userId: string;
    name: string
    rating: number;
    comment: string
}

