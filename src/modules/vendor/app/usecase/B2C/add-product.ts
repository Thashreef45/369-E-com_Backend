import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class CreateProduct {

    private repository: IRepository
    private createProduct : any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.createProduct = dependencies.createProduct
    }


    async execute(data: Input): Promise<Output> {


        //check credentials
        const credentials = this.credentialCheck(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        try {


            // fetch vendor data
            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: "Vendor not found" },
                status: StatusCode.NOT_FOUND
            }


            // create new product
            const updated: Output = await this.createProduct({ ...data, ownerId: vendor._id })
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {

            return {
                response: { message: "Error creating product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    // method for input credential checking 
    credentialCheck(data: Input): { success: boolean, message: string, status: StatusCode } {
        
        // check input credentials
        if (!data.name || !data.price || !data.stock
            || !data.description || !data.images || !data.thumbnail ||
            !data.categoryId || !data.subCategoryId 
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: true
        }

        // check input credential type
        if (
            typeof data.name !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.price !== 'number' ||
            typeof data.categoryId !== 'string' ||
            typeof data.subCategoryId !== 'string' ||

            !Array.isArray(data.images) ||
            data.images.every(image => typeof image !== 'string') 

        ) return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if(data.stock < 25) return {
            message: "Stock should be more than 25",
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


        //check pricing
        if (data.price < 1) return {
            message: "Price should be at least one",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // success full
        return { success: true, message: "", status: StatusCode.OK, }
    }
}

export default CreateProduct



interface Input {

    email: string
    name: string
    description: string
    price: number
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string,
    subCategoryId: string
}




interface Output {
    response: { message: string, data?: {} },
    status: StatusCode
}


interface Dependencies {

    repository: IRepository
    createProduct(data: Input & { ownerId: string, isAdmin: boolean }): Promise<Output>
}