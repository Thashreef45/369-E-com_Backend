import StatusCode from "../../../infrastructure/config/status-code"
import IRepository from "../../../infrastructure/interface/IRepository"


class ProductCheckout {

    private repository: IRepository

    private updateStock: (data: { productId: string, quantity: number }[])
        => Promise<{ message: string, success: boolean, status: StatusCode }>

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
        this.updateStock = dependencies.updateStock
    }


    async execute(data: Input): Promise<Output> {

        //check input credentials
        const credential = this.checkInputCredentials(data)
        if (!credential.success) return {
            response: { message: credential.message },
            status: credential.status
        }


        try {
            // check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            // check address exist or not
            const isExist = this.checkAddress(user.address, data.addressId)
            if (!isExist) return {
                response: { message: 'Address not found' },
                status: StatusCode.NOT_FOUND
            }


            //update stock
            const params = [{ productId: data.productId, quantity: data.quantity }]
            const updated = await this.updateStock(params)
            if (!updated.success) return {
                response: { message: updated.message },
                status: updated.status
            }


            //create order


            // check cod or not
            //responde with orderId , price , order description



            // demo response
            return {
                response: { message: "" },
                status: StatusCode.OK
            }


        } catch (error) {

            return {
                response: { message: "Error during checkout" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

    }



    /** Method for checking input credentials */
    private checkInputCredentials(data: Input): {
        message: string, status: StatusCode, success: boolean
    } {
        if (data.addressId || typeof data.cod == 'undefined' ||
            !data.productId || !data.quantity
        ) return {
            message: "Credentials missing",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        //check types 
        if (
            typeof data.addressId != 'string' ||
            typeof data.cod != 'boolean' ||
            typeof data.addressId != 'string' ||
            typeof data.addressId != 'string'
        ) return {
            message: "Credential types not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        if (data.productId.length > 25) return {
            message: "Invalid productId",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        if (data.addressId.length > 25) return {
            message: "Invalid address",
            status: StatusCode.BAD_REQUEST,
            success: false
        }

        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }


    /**method for checking address exist or not */
    private checkAddress(address: { _id: string, active: boolean }[], id: string): boolean {
        for (let i = 0; i < address.length; i++) {
            if (address[i]._id == id && address[i].active) return true
        } return false
    }
}


export default ProductCheckout



interface Input {
    phone: string,
    addressId: string
    productId: string
    quantity: number
    cod: boolean
}

interface Output {
    response: { message: string },
    status: StatusCode
}




interface Dependencies {

    repository: IRepository

    // getProductsById(productIds: string[]): Promise<any>

    updateStock(data: { productId: string, quantity: number }[])
        : Promise<{ message: string, success: boolean, status: StatusCode }>

    // createOrder(data: {
    //     products: { productId: string, quantity: number, price: number }[]
    //     userId: string; addressId: string; cod: boolean
    // }): Promise<any>
}