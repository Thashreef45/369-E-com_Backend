import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class FetchAdminProducts {

    private fetchProducts: (ownerId: string) => Promise<Product[]>
    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.fetchProducts = dependencies.fetchProducts
    }

    async execute(data: Input): Promise<Output> {

        const admin = await this.repository.findByEmail(data.email)
        if (!admin) return {
            response: { message: "Admin account not found" },
            status: StatusCode.NOT_FOUND
        }

        const products = await this.fetchProducts(admin._id)
        const resData = this.productMapper(products)


        return {
            response: { message: 'Success', data: resData },
            status: StatusCode.OK
        }
    }


    /** Method will return product mapped data */
    private productMapper(data: Product[]): Product[] {

        return data.map(x => ({
            _id: x._id,
            name: x.name,
            description: x.description,
            price: x.price,
            thumbnail: x.thumbnail,
            categoryId: x.categoryId,
            active: x.active
        }))
    }
}



export default FetchAdminProducts

interface Input {
    email: string
}

interface Output {
    response: { message: string, data?: Product[] },
    status: StatusCode
}

interface Dependencies {

    fetchProducts(ownerId: string): Promise<Product[]>
    repository: IRepository
}


interface Product {

    _id: string
    name: string
    description: string
    price: number
    thumbnail: string
    // images: string[]
    categoryId: string
    // ownerId: string
    active: boolean
}







