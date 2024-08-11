import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAProduct {

    private fetchAProduct: (productId: string) => Promise<Product>
    private repository: IRepository
    constructor(dependencies: Dependencies) {

    }

    async execute(data: Input): Promise<Output> {


        try {

            if (!data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }
            

            const product = await this.fetchAProduct(data.productId)
            if (!product) return {
                response: { message: 'Product not found' },
                status: StatusCode.NOT_FOUND
            }


            //check ownerId ? 


            const resData = this.productMapper(product)
            return {
                response: { message: 'Success', data: resData },
                status: StatusCode.OK
            }

        } catch (error) {
            return {
                response: { message: "Error fetching product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    /** Method for mapping product data */
    productMapper(data: Product): Product {

        return {
            _id: data._id,
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            images: data.images,
            price: data.price,
            active: data.active,
            categoryId: data.categoryId
        }
    }
}


export default FetchAProduct

interface Input {
    email: string
    productId: string
}

interface Output {
    response: { message: string, data?: Product },
    status: StatusCode
}

interface Dependencies {
    fetchAProduct(productId: string): Promise<Product>
}

interface Product {
    _id: string
    name: string
    description: string
    price: number
    thumbnail: string
    images: string[]
    categoryId: string
    // ownerId: string
    active: boolean
}