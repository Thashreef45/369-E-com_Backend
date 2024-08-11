import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"


class FetchAService {
    private repository: IRepository
    private fetchAdmin: (ownerId: string) => Promise<any>
    private fetchVendor: (ownerId: string) => Promise<any>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchAdmin = dependencies.fetchAdmin
        this.fetchVendor = dependencies.fetchVendor
    }

    async execute(data: Input): Promise<Output> {

        try {



            const service: Service = await this.repository.fetchACtiveServiceById(data.serviceId)
            if (!service) return {
                response: { message: 'Service not found' },
                status: StatusCode.NOT_FOUND
            }

            const ownerSocial = await this.#fetchOwner(service.ownerId)
            const resData = this.#ServiceMapper(service, ownerSocial)
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }



        } catch (error) {

            return {
                response: { message: "Error fetching Service" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    /** Method for fetching service owner social data */
    async #fetchOwner(ownerId: string): Promise<Social> {

        const admin: Social = await this.fetchAdmin(ownerId)
        if (admin) return {
            phone: admin.phone, whatsapp: admin.whatsapp,
        }

        const vendor: Social = await this.fetchVendor(ownerId)
        if (vendor) return {
            phone: vendor.phone, whatsapp: vendor.whatsapp,
        }

        throw new Error("Failed to fetch owner details")

    }


    #ServiceMapper(service: Service, ownerData: Social): MappedData {
        return {
            _id: service._id,
            name: service.name,
            description: service.description,
            thumbnail: service.thumbnail,
            images: service.images,
            categoryId: service.categoryId,
            subcategoryId: service.subcategoryId,
            enquiry: {
                phone: ownerData.phone,
                whatsapp: ownerData.whatsapp
            }
        }
    }




}

export default FetchAService

interface Input {
    serviceId: string
}

interface Output {
    response: { message: string, data?: any },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    fetchAdmin(ownerId: string): Promise<any>
    fetchVendor(ownerId: string): Promise<any>
}



interface Service {
    _id: string
    name: string
    description: string
    thumbnail: string
    images: string[]
    categoryId: string
    subcategoryId: string

    ownerId: string
    // active: boolean
}


interface MappedData {
    _id: string
    name: string
    description: string
    thumbnail: string
    images: string[]
    categoryId: string
    subcategoryId: string,
    enquiry: Social
}


//  admin/vendor
interface Social {
    whatsapp: String,
    phone: String,
}

