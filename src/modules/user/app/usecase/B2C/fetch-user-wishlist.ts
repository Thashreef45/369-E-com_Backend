import IRepository from '../../../infrastructure/interface/IRepository'
import StatusCode from '../../../infrastructure/config/status-code'

class FetchWishlist {

    private repository: IRepository
    private getProducts

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProducts = dependencies.getProducts
    }

    async execute(data: Input) {


        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }



        // return empty arry if nothing in user wishlist
        if (!user?.wishlist?.length) return {
            response: { message: "Success", data: [] },
            status: StatusCode.OK
        }



        // fetch datas of that products
        const wishlist = await this.getProducts(user.wishlist)

        // response
        return {
            response: { message: "Success", data: wishlist },
            status: StatusCode.OK
        }
    }

    ResponseMapper(data: Products[]): ResponseMapperOutput[] {

        // let obj:ResponseMapperOutput | any = {}
        const arr: ResponseMapperOutput[] = []


        for (let i = 0; i < data.length; i++) {
            arr.push({
                _id : data[i]._id,
                name: data[i].name,
                description : data[i].description,
                price : data[i].price,
                actualPrice : data[i].actualPrice,
                offer : data[i].offer,
                thumbnail : data[i].thumbnail,
                stock : data[i].stock,
                averageRating : data[i].averageRating
            })
        }

        return arr
    }




}

export default FetchWishlist


interface Input {
    phone: string,
}

interface Dependencies {
    repository: IRepository
    getProducts(idArray: string[]): Promise<any[]> //todo:implementations of interface
}


interface ResponseMapperOutput {
    _id : string
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

    _id : string
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

