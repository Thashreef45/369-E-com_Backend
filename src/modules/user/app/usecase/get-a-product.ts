import StatusCode from '../../infrastructure/config/staus-code'

class GetProduct {

    private getProduct: any

    constructor(dependencies: Dependencies) {
        this.getProduct = dependencies.getProduct
    }

    async execute(data: Input): Promise<Output> {

        try {
            if (!data.productId) return {
                response: { message: "Credentials missing" },
                status: StatusCode.BAD_REQUEST
            }

            // fetch a product
            const product = await this.getProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }

            const resData = this.ResponseMapper(product)

            //succesfull response
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching product" },
                status: StatusCode.BAD_REQUEST
            }
        }
    }



    /** Method for mapping product data */
    ResponseMapper(data: Product): Product {
        const obj: Product = {
            _id: data._id,
            name: data.name,
            description: data.description,
            images: data.images,
            rating: data.rating,
            price: data.price,
            actualPrice: data.actualPrice,
            offer: data.offer,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId,
            thumbnail: data.thumbnail,
            stock: data.stock,
            averageRating: data.averageRating
        }
        return obj
    }

}


export default GetProduct


interface Dependencies {
    getProduct(productId: string): Promise<any> //todo:implementations of interface
}

interface Input {
    productId: string
}

interface Output {
    response: { message: string, data?: Product },
    status: StatusCode
}



interface Product {

    _id: string
    name: string
    description: string

    price: string

    actualPrice: string

    offer: boolean

    images: string[]
    thumbnail: string
    stock: number
    categoryId: string
    subcategoryId: string

    rating: {
        one: number
        two: number
        three: number
        four: number
        five: number
    },

    averageRating: number
}

