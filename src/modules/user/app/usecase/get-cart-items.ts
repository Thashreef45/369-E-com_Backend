import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class GetCartItems {

    private repository: IRepository
    private getProducts

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.getProducts = dependencies.getProducts
    }

    async execute(data: Input) {

        // db data fetch
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }
        }

        // create array wich have ids of user cart items
        const idArray = this.cartItems(user.cart)

        if (!idArray.length) {
            return {
                response: { message: "Success", data: [] },
                status: StatusCode.OK
            }
        }

        // fetch datas of that products
        const cartData = await this.getProducts(idArray)


        // response
        return {
            response: { message: "Success", data: cartData },
            status: StatusCode.OK
        }
    }


    //create a array of id's of user cart items eg:["id1","id2","id3"]
    private cartItems(data: Cart[]): string[] {
        return data.map((items: Cart) => {
            return items.product_id
        })
    }
}

export default GetCartItems


interface Input {
    phone: string,
}

interface Dependencies {
    repository: IRepository
    getProducts(idArray: string[]): Promise<any[]> //todo:implementations of interface
}

interface Cart {
    product_id: string
    quantity: number
}

