import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAllServices {

    private repository: IRepository
    private fetchAllServices: (data: Input & { ownerId: string }) => Promise<any>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchAllServices = dependencies.fetchAllServices
    }


    async execute(data: Input): Promise<Output> {


        //check input credentials
        const credential = this.#checkInputCredentials(data)
        if (!credential.success) return {
            response: { message: credential.message },
            status: credential.status
        }

        const admin = await this.repository.findByEmail(data.email)
        if (!admin) return {
            response: { message: "Admin account not found" },
            status: StatusCode.NOT_FOUND
        }



        const products = await this.fetchAllServices({ ...data, ownerId: admin._id })
        const resData = this.#ServiceMapper(products)

        
        //have to map the products

        return {
            response: { message: "Success", data: resData },
            status: StatusCode.OK
        }
    }


    /** Method maps the service data */
    #ServiceMapper(services:Service[]) :Service[]{

        return services.map(service => ({
            name: service.name,
            description: service.description,
            thumbnail: service.thumbnail,
            categoryId: service.categoryId,
            subcategoryId: service.subcategoryId,
            // ownerId: service.ownerId,
            active: service.active,
        }));
    }


    #checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        //check category
        if (data.query.category && data.query.category?.length > 25) return {
            message: "Category id is not valid",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check sub-category
        if (data.query.subCategory && data.query.subCategory?.length > 25) return {
            message: "Sub-Category id is not valid",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check search query length
        if (data.query?.query && data.query?.query?.length > 50) return {
            message: "Search query cannot exceed 50 characters",
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

export default FetchAllServices


interface Input {
    email: string,
    query: {
        category?: string, query?: string, subCategory?: string
    }
}

interface Output {
    response: { message: string, data?: Service[] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    fetchAllServices(data: Input & { ownerId: string }): Promise<any>
}


interface Service {
    name: string;
    description: string;
    thumbnail: string;
    // images: string[]
    categoryId: string
    subcategoryId: string
    // ownerId: string; 
    active: boolean;
}