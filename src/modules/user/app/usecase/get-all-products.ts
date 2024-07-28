import StatusCode from '../../infrastructure/config/staus-code'
import IRepository from '../../infrastructure/interface/IRepository'

class GetAllProducts {

    private getAllProducts

    constructor(dependencies: Dependencies) {
        this.getAllProducts = dependencies.getAllProducts
    }

    async execute(query:any) : Promise<Output>  {


        // fetch products
        const products = await this.getAllProducts(query)
        const resData  = this.ResponseMapper(products)

        // response
        return {
            response: { message: "Success", data: resData },
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

export default GetAllProducts


interface Dependencies {
    getAllProducts(query:any): Promise<any> //todo:implementations of interface
}


interface Output {
    response : {message:string , data ?:any},
    status : StatusCode
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

