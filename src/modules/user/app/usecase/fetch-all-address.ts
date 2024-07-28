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
        const addressList = this.filterAddress(user.address)
        return {
            response: { message: "Success",data : addressList },
            status: StatusCode.OK
        }
    }


    /** Filter address */
    filterAddress(address: Address[]) {
        if(!address.length) return []

        let array: Address[] | any[] = []

        for (let i = 0; i < address.length; i++) {
            if (address[i].active) {
                let obj = {
                    name: address[i].name,
                    address: address[i].address,
                    phone: address[i].phone,
                    pin: address[i].pin,
                }

                array.push(obj)
            }
        }
        return array
    }

}

export default FetchAllAddress


interface Input {
    phone: string,
}

interface Output {
    response: { message: string ,data?:Address[] },
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
    active ?: boolean
}