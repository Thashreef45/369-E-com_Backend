import IRepository from '../../infrastructure/interface/IRepository'
import StatusCode from '../../infrastructure/config/staus-code'

class DeleteAddress {

    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input) {

        // check user exist or not
        const user = await this.repository.findByPhone(data.phone)
        if (!user) {
            return {
                response: { message: 'User not found' },
                status: StatusCode.NOT_FOUND
            }
        }

        const isExist = this.checkAddress(user.address,data.addressId)
        if(!isExist) return {
            response: { message: 'Address not found' },
            status: StatusCode.NOT_FOUND
        }


        const response = await this.repository.removeAddress(data.phone, data.addressId)

        // response,
        return {
            response: { message: "Success" },
            status: StatusCode.OK
        }
    }


    private checkAddress(address : {_id:string}[], id:string) {
        for(let i = 0 ; i < address.length; i++){
            if(address[i]._id == id) return true
        }return false
    }

}

export default DeleteAddress


interface Input {
    phone: string,
    addressId: string,
}

interface Dependencies {
    repository: IRepository
}


