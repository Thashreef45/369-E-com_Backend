import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class CreateService {

    private createService: (data: Input & { ownerId: string }) => Promise<Output>
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.createService = dependencies.createService
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
            const admin = await this.repository.findByEmail(data.email)
            if (!admin) return {
                response: { message: "Admin account not found" },
                status: StatusCode.NOT_FOUND
            }

            const created = await this.createService({ ...data, ownerId: admin._id })
            return {
                response: created.response,
                status: created.status
            }
        } catch (error) {

            return {
                response: { message: "Error creating service" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    /**Method for checking input credentials */
    #checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        // Check if all required fields are provided
        if (!data.name || !data.description || !data.thumbnail ||
            !data.images || !data.categoryId || !data.subcategoryId
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        };


        // Check input credential types
        if (
            typeof data.name !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.thumbnail !== 'string' ||
            !Array.isArray(data.images) ||
            data.images.some(image => typeof image !== 'string') ||
            typeof data.categoryId !== 'string' ||
            typeof data.subcategoryId !== 'string'
        ) {
            return {
                message: 'Credential type not matching',
                status: StatusCode.BAD_REQUEST,
                success: false
            };
        }

        // Check name length
        if (data.name.length > 30 || data.name.length < 3) return {
            message: "Name length should be between 3 to 30 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // Check description length
        if (data.description.length > 250 || data.description.length < 50) return {
            message: "Description length should be between 50 and 250 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // Check images array (length and type)
        if (data.images.length > 5) return {
            message: "Images array cannot contain more than 5 items",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // Check category and sub-category
        if (data.categoryId.length > 25 || data.subcategoryId.length > 25) return {
            message: "Invalid Category ID or Subcategory ID",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // If all checks pass
        return {
            message: "",
            status: StatusCode.OK,
            success: true
        };

    }
}


export default CreateService


interface Input {
    name: string
    description: string
    thumbnail: string
    images: string[]
    categoryId: string
    subcategoryId: string

    email: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    createService(data: Input & { ownerId: string }): Promise<Output>
}