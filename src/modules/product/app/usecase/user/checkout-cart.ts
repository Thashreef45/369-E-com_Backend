import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from "../../../infrastructure/config/staus-code"




class CheckoutUserCart {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input[]): Promise<Output> {


        const productIds = this.createIdArray(data)


        const products = this.repository.getProducts(productIds)

        
        
        //check that every product is in stock
        const isInStock = this.checkStock(data, products)
        if (!isInStock) return {
            response: { message: "Product is not stock" },
            status: StatusCode.BAD_REQUEST
        }







        //demo repsonse
        return {
            response: { message: "" },
            status: StatusCode.OK
        }
    }



    // method checks the product stock and cart quantity
    checkStock(data: Input[], products: { _id: string, stock: number }[]): boolean {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (data[i].productID == products[j]._id) {
                    if (data[i].quantity > products[j].stock) return false
                }
            }
        } return true
    }



    //method -- returns array product Ids
    createIdArray(data: Input[]): string[] {
        return data.map(x => x.productID)
    }
}


export default CheckoutUserCart


interface Input {
    productID: string, quantity: number
}


interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}