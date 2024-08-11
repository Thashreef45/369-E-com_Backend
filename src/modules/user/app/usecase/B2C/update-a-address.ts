import IRepository from '../../../infrastructure/interface/IRepository'
import StatusCode from '../../../infrastructure/config/status-code'

class UpdateAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        
        //check input credentials
        const credentials = this.checkCredentials(data)
        if (!credentials.success) return {
            response: { message: credentials.message },
            status: credentials.status
        }


        try {
            // check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            // check address exist or not || inactive/deleted address
            const addressExist = this.checkAddress(user.address, data.addressId)
            if (!addressExist) return {
                response: { message: "Address not found" },
                status: StatusCode.NOT_FOUND
            }



            //update the address
            const response = await this.repository.updateAddress(data.phone, data.addressId, data.address)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }
        } catch (error) {

            return {
                response: { message: "Error updating address" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }


    // check address exist or not
    private checkAddress(address: { _id: string, active: boolean }[], id: string): boolean {
        for (let i = 0; i < address.length; i++) {
            if (!address[i].active) return false // inactive address
            if (address[i]._id == id) return true
        } return false
    }






    /** Method for checking input credentials */
    private checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {
        const address = data.address

        // check input credentials exist or not
        if (!address || !data.addressId || !address.address ||
            !address.name || !address.phone || !address.pin
        ) return {
            message: "Credentials missing",
            status: StatusCode.INTERNAL_ERROR,
            success: false
        }


        // check input credential types
        if (
            typeof data.addressId != 'string' ||
            typeof address.address != 'string' ||
            typeof address.name != 'string' ||
            typeof address.phone != 'string' ||
            typeof address.pin != 'string'
        ) return {
            message: "Credentials types not matching",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        if (address.address.length > 250) return {
            message: "Address length should be less than 250 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }
}


export default UpdateAddress


interface Input {
    phone: string,
    addressId: string,
    address: {
        name: string,
        address: string,
        phone: string,
        pin: string
    }
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


