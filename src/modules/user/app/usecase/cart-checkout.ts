import StatusCode from "../../infrastructure/config/staus-code";
import IRepository from "../../infrastructure/interface/IRepository";


class CartCheckout {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        //check input credentials
        if (data.addressId) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }


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


        //check cart is empty or not
        if (!user?.cart?.length) return {
            response: { message: "Cart is empty" },
            status: StatusCode.BAD_REQUEST
        }

        


        // response,
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }



    }



    // method for checking address exist or not
    private checkAddress(address: { _id: string }[], id: string) {
        for (let i = 0; i < address.length; i++) {
            if (address[i]._id == id) return true
        } return false
    }
}


export default CartCheckout

interface Input {
    phone: string,
    addressId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}