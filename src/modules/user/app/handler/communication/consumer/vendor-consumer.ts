// --------------------------   VENDOR CONSUMER     -------------------------------

import FetchUserByPhone from "../../../usecase/fetch-user-by-phone"
import userRepository from '../../../../infrastructure/repository/user-repository'

const repository = new userRepository()



export const fetchUserByPhone = async(phone:string) => {

            // fetching posts on active - true/false
    const dependencies = {
        repository : repository
    }
    const data = {
        phone : phone
    }
    const interactor = new FetchUserByPhone(dependencies)
    const output  =  await interactor.execute(data)
    return output

}