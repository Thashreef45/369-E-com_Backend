import StatusCode from "../../infrastructure/config/staus-code"
import IRepository from "../../infrastructure/interface/IRepository"



class FetchAllAddress {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        const user = await this.repository.findByPhone(data.phone)
        if (!user) return {
            response: { message: 'User not found' },
            status: StatusCode.NOT_FOUND
        }


        // filter address
        const addressList = this.AddressMapper(user.address)
        return {
            response: { message: "Success", data: addressList },
            status: StatusCode.OK
        }
    }


    /**Method filters address */
    AddressMapper(address: Address[]) {
        if (!address.length) return []

        return address
            .filter(address => address.active)
            .map(({ name, address, phone, pin }) => ({ name, address, phone, pin })) 
    }

}

export default FetchAllAddress


interface Input {
    phone: string,
}

interface Output {
    response: { message: string, data?: Address[] },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}

interface Address {
    name: string,
    address: string,
    phone: string,
    pin: string,
    active?: boolean
}