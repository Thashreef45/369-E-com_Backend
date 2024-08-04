import StatusCode from "../../../infrastructure/config/staus-code";
import IRepository from "../../../infrastructure/interface/IRepository";



class FetchAllProducts {


    private repository: IRepository
    private getAllProducts: (data: { ownerId: string, query: any }) => Promise<any>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getAllProducts = dependencies.getAllProducts
    }

    async execute(data: Input): Promise<Output> {

        try {

            const vendor = await this.repository.fetchVendorWithEmail(data.email)
            if (!vendor) return {
                response: { message: 'Vendor account not found' },
                status: StatusCode.NOT_FOUND
            }



            //fetch products
            const products = await this.getAllProducts({ ownerId: vendor._id, query: data.query })
            const resData = this.ResponseMapper(products)
            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response : { message : "Error fetching products"},
                status : StatusCode.INTERNAL_ERROR
            }
        }
    }



    private ResponseMapper(data: Products[]): ResponseMapperOutput[] {

        const arr: ResponseMapperOutput[] = []

        return data.map(x => ({
            _id: x._id,
            name: x.name,
            description: x.description,
            price: x.price,
            actualPrice: x.actualPrice,
            offer: x.offer,
            thumbnail: x.thumbnail,
            stock: x.stock,
            averageRating: x.averageRating
        }))
    }
}

export default FetchAllProducts



interface Input {
    email: string,
    query: any
}


interface Output {
    response: { message: string, data?: ResponseMapperOutput[] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    getAllProducts(data: { ownerId: string, query: any }): Promise<any>
}


interface ResponseMapperOutput {
    _id: string
    name: string
    description: string

    price: string
    actualPrice: string
    offer: boolean

    thumbnail: string
    stock: number

    averageRating: number
}

interface Products {
    _id: string
    name: string
    description: string
    price: string
    actualPrice: string
    offer: boolean
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




