import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/status-code'

class AddNewAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {

            // Check input credentials
            const credentials = this.checkCredentials(data)
            if (!credentials.success) return {
                response: { message: credentials.message },
                status: credentials.status
            }


            //check user exist or not
            const user = await this.repository.findByPhone(data.phone)
            if (!user) return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }


            //check address limit
            const addresLimit = this.checkAddressLimit(user.address)
            if (!addresLimit) return {
                response: { message: "Address limit exceeded" },
                status: StatusCode.BAD_REQUEST
            }



            const response = await this.repository.addNewAddress(data.phone, data.address)
            return {
                response: { message: "Success" },
                status: StatusCode.CREATED
            }

        } catch (error) {
            return {
                response: { message: "Error adding new address" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }



    /** Method for checking input credentials */
    private checkCredentials(data: Input): { message: string, status: StatusCode, success: boolean } {
        const address = data.address

        // check input credentials exist or not
        if (!address || !address.address ||
            !address.name || !address.phone || !address.pin
        ) return {
            message: "Credentials missing",
            status: StatusCode.INTERNAL_ERROR,
            success: false
        }


        // check input credential types
        if (
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
            message: "Address length should be less than 300 characters",
            status: StatusCode.BAD_REQUEST,
            success: false
        }


        return {
            message: "",
            status: StatusCode.OK,
            success: true
        }
    }


    /** Method to check that is there 5 active add */
    private checkAddressLimit(address: { active: boolean }[]): boolean {

        const activeAddressesCount = address.filter(address => address.active).length
        return activeAddressesCount < 5;
    }

}

export default AddNewAddress


interface Input {
    phone: string
    address: Address
}

interface Address {
    name: string,
    address: string,
    phone: string,
    pin: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}


