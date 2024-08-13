import StatusCode from '../../../infrastructure/config/staus-code'
import IRepository from '../../../infrastructure/interface/IRepository'

class AddProduct {

    private createProduct: (data: Input & { ownerId: string }) => Promise<Output>
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.createProduct = dependencies.createProduct
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        //check input credentials
        const credentials = this.checkInputCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }

        try {


            // fetch Vendor 
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor account not found" },
                status: StatusCode.NOT_FOUND
            }



            // product creation
            const updated = await this.createProduct({ ...data, ownerId: vendor._id })
            return {
                response: updated.response,
                status: updated.status
            }


        } catch (error) {

            return {
                response: { message: "Error adding product" },
                status: StatusCode.INTERNAL_ERROR
            }

        }
    }


    /** Mehod for checking input credentials */
    checkInputCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {


        // check input credentials
        if (!data.name || !data.description || !data.thumbnail ||
            !data.images || !data.categoryId || !data.subCategoryId
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        // check input credential types
        if (
            typeof data.name != 'string' ||
            typeof data.description != 'string' ||
            typeof data.thumbnail != 'string' ||

            !Array.isArray(data.images) ||
            data.images.every(image => typeof image != 'string') ||

            typeof data.categoryId != 'string' ||
            typeof data.subCategoryId != 'string'
        ) return {
            message: 'Credential type not matching',
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check name length
        if (data.name.length > 10 || data.name.length < 3) return {
            message: "Name length should between 3 to 10 ",
            status: StatusCode.BAD_REQUEST, success: false
        }

        //check description
        if (data.description.length > 250 || data.description.length < 50) return {
            message: "Description length should be between 50 and 250 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check images 
        if (data.images.length > 5) return {
            message: "You can upload a maximum of 5 images.",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if(data.categoryId.length > 25) return {
            message: "Invalid categoryId",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if(data.subCategoryId.length > 25) return {
            message: "Invalid subCategoryId",
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


export default AddProduct

interface Input {
    name: string,
    description: string,
    thumbnail: string,
    images: string[]
    categoryId: string,

    subCategoryId: string

    email: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    createProduct(data: Input & { ownerId: string }): Promise<Output>
    repository: IRepository
}