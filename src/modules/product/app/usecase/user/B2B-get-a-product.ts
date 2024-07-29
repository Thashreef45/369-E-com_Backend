import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository-B2B"


class FetchAProduct {
    private repository: IRepository
    fetchVendorWithId: any
    fetchAdminWithId: any

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.fetchAdminWithId = dependencies.fetchAdminWithId,
            this.fetchVendorWithId = dependencies.fetchVendorWithId
    }



    async execute(data: Input): Promise<Output> {

        try {

            // fetch product
            const product: Product = await this.repository.findProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND,
            }


            const ownerData: Owner = await this.fetchOwner(product?.ownerId)
            const resData = this.ProductMapper(product, ownerData)
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK,
            }

        } catch (error) {

            return {
                response: { message: "Error fetching product" },
                status: StatusCode.INTERNAL_ERROR,
            }
        }

    }

    /** Method fetches the owner details of the product */
    private async fetchOwner(ownerId: string): Promise<Owner> {

        const admin = await this.fetchAdminWithId(ownerId)
        if (!admin) {
            const vendor = await this.fetchVendorWithId(ownerId)

            return {
                whatsapp: vendor.whatsapp,
                phone: vendor.phone
            }
        } else {


            return {
                whatsapp: admin.whatsapp,
                phone: admin.phone
            }

        }
    }



    /** Method for mapping product data and attaching owner contact details */
    private ProductMapper(product: Product, owner: Owner): MappedData {
        return {
            name: product.name,
            description: product.description,
            thumbnail: product.thumbnail,
            images: product.images,
            price: product.price,
            categoryId: product.categoryId,
            enquiry: {
                whatsapp: owner.whatsapp,
                phone: owner.phone
            }
        }
    }
}

export default FetchAProduct

interface Input {
    productId: string
}

interface Output {
    response: { message: string, data?: MappedData }
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    fetchVendorWithId(id: string): Promise<any>
    fetchAdminWithId(id: string): Promise<any>
}



interface Owner {
    whatsapp: String,
    phone: String,

}

interface Product {
    name: string
    description: string
    price: number
    thumbnail: string
    images: string[]
    categoryId: string
    ownerId: string
}

interface MappedData {
    name: string
    description: string
    price: number
    thumbnail: string
    images: string[]
    categoryId: string
    enquiry: {
        whatsapp: String,
        phone: String
    }
}