import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class UpdateProduct {

    private updateProduct
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.updateProduct = dependencies.updateProduct
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        //check admin
        const admin = await this.repository.findByEmail(data.email)
        if (!admin) return {
            response: { message: "Admin account not found" },
            status: StatusCode.NOT_FOUND
        }


        // check input credentials
        const credentials = this.checkCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        // check pricing , offer and conflicts
        const checkPricing = this.checkPrice(data.actualPrice, data.price, data.offer)
        if (!checkPricing.success) return {
            response: { message: checkPricing.message },
            status: checkPricing.status
        }



        //update product
        const updated: Output = await this.updateProduct({...data,ownerId:admin._id})
        return {
            response: updated.response,
            status: updated.status
        }


    }



    // method to check input credentials
    checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {

        // check input credentials
        if (!data.productId || !data.name || !data.price || !data.stock
            || !data.description || !data.images || !data.thumbnail ||
            !data.categoryId || !data.subCategoryId || !data.actualPrice ||
            !data.offer
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: true
        }

        // check input credential type
        if (
            typeof data.productId !== 'string' ||
            typeof data.name !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.actualPrice !== 'number' ||
            typeof data.price !== 'number' ||
            typeof data.categoryId !== 'string' ||
            typeof data.subCategoryId !== 'string' ||
            !Array.isArray(data.images) ||
            data.images.every(image => typeof image !== 'string') ||
            typeof data.offer !== 'boolean'
        ) return {
            message: "Credentials type not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        if (data.stock < 25) return {
            message: "Stock should be more than 25",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }



    /** check price and actual price with offer */
    checkPrice(actualPrice: number, price: number, offer: boolean)
        : { message: string, status: StatusCode, success: boolean } {


        // without offer price shoud be same
        if (!offer && (actualPrice > price) || actualPrice < price) return {
            message: 'Miss match in price and actual price',
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        // with offer price should be different
        if (offer && (actualPrice == price)) return {
            message: "Product is in offer and  price should be less than actual price",
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






export default UpdateProduct




interface Input {
    productId: string
    name: string
    description: string
    actualPrice: number
    price: number
    offer: boolean
    images: string[]
    thumbnail: string
    stock: number
    categoryId: string
    subCategoryId: string
    email: string
}


interface Output {
    response: { message: String },
    status: StatusCode
}


interface Dependencies {
    updateProduct(data: any): any
    repository: IRepository
}
