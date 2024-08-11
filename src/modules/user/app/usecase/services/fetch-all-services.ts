import StatusCode from "../../../infrastructure/config/status-code";


class FetchAllServices {

    private fetchAllServices: (query: Query) => Promise<Service[]>

    constructor(dependencies: Dependencies) {
        this.fetchAllServices = dependencies.fetchAllServices
    }

    async execute(query: Query): Promise<Output> {

        //check input credentials
        const credentials = this.#checkInputCredentials(query)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        try {

            const data = await this.fetchAllServices(query)
            const resData = this.#serviceMapper(data)
            //fetch data
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }
        } catch (error) {

            return {
                response: { message: "Error fetching services" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    /** Method for checking input credentials */
    #checkInputCredentials(data: Query): { message: string, status: StatusCode, success: boolean } {

        if (data.category && data.category.length > 25) return {
            message: "Category id not valid",
            status: StatusCode.BAD_REQUEST,
            success: false
        }
        if (data.subCategory && data.subCategory.length > 25) return {
            message: "Sub-Category id not valid",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.query && data.query.length > 30) return {
            message: "Search query exceeds the maximum length of 30 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.page_no && isNaN(data.page_no)) return {
            message: "Invalid page number. It must be a number",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.limit && isNaN(data.limit)) return {
            message: "Invalid limit. It must be a number",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }


    #serviceMapper(data: Service[]): Service[] {
        return data.map(x => ({
            _id: x?._id,
            name: x?.name,
            description: x?.description,
            thumbnail: x?.thumbnail,
            categoryId: x?.categoryId,
            subcategoryId: x?.subcategoryId,
        }))
    }
}

export default FetchAllServices


interface Query {
    category?: string;
    subCategory?: string;
    query?: string;
    limit?: number;
    page_no?: number;
}

interface Output {
    response: { message: string, data?: Service[] },
    status: StatusCode
}

interface Dependencies {
    fetchAllServices(query: Query): Promise<Service[]>
}


interface Service {
    _id: string,
    name: string,
    description: string
    thumbnail: string,
    categoryId: string,
    subcategoryId: string,
}

