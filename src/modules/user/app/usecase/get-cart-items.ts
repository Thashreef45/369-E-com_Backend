import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/status-code'

class GetCartItems {

    private repository: IRepository
    private getProducts

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProducts = dependencies.getProducts
    }

    async execute(data: Input): Promise<Output> {


        try {

            // check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            // create array wich have ids of user cart items
            const idArray = this.cartItems(user.cart)

            // return if cart is empty
            if (!idArray.length) return {
                response: { message: "Success", data: [] },
                status: StatusCode.OK
            }



            // fetch datas of that products
            const cartData = await this.getProducts(idArray)

            const responseData = this.attachCartQuantiy(cartData, user.cart)
            // response
            return {
                response: { message: "Success", data: responseData },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error fetching cart" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }


    //create a array of id's of user cart items eg:["id1","id2","id3"]
    private cartItems(data: Cart[]): string[] {
        return data.map((items: Cart) => {
            return items.productId
        })
    }



    //method for attaching cart quantity with product
    private attachCartQuantiy(data: Product[], cartData: { productId: string, quantity: number, categoryId: string, subcategoryId: string }[]) {


        let arr: Product[]  = []

        for (let i = 0; i < cartData.length; i++) {
            
            const obj = this.fileterCartObject(data[i])

            // loop to attach cart quantity along with product details
            for(let j = 0 ; j < cartData.length ; j++){
                if(String(obj._id) == String(cartData[j].productId)) obj.quantity = cartData[j].quantity
            }
            arr.push(obj)
        }
        return arr
    }

    private fileterCartObject(data: Product) : Product {
        return {
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            actualPrice: data.actualPrice,
            discount: data.discount,
            thumbnail: data.thumbnail,
            stock: data.stock,
            quantity: 0
        }
    }
}

export default GetCartItems


interface Input {
    phone: string,
}

interface Output {
    response: { message: string, data?: {}[] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
    getProducts(idArray: string[]): Promise<any[]>
}

interface Cart {
    productId: string
    quantity: number
}

interface Product {
    "_id": string
    "name": string
    "description": string
    "price": number
    "actualPrice": number
    "discount": boolean
    "thumbnail": string
    "stock": number
    "quantity": number
}

