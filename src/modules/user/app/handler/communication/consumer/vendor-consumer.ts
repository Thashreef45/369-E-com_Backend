// --------------------------   VENDOR CONSUMER     -------------------------------

import userRepository from '../../../../infrastructure/repository/user-repository'

//usecase
import FetchUserByPhone from "../../../usecase/fetch-user-by-phone"
import FetchUserById from "../../../usecase/fetch-user-by-id"


//Repository instance
const repository = new userRepository()



export const fetchUserByPhone = async (phone: string) => {

    // fetching posts on active - true/false
    const dependencies = {
        repository: repository
    }
    const data = {
        phone: phone
    }
    const interactor = new FetchUserByPhone(dependencies)
    const output = await interactor.execute(data)
    return output

}

/** Fetch User by Id */
export const fetchUserById = async (userId: string) => {

    // fetching posts on active - true/false
    const dependencies = {
        repository: repository
    }
    const data = {
        userId
    }
    const interactor = new FetchUserById(dependencies)
    const output = await interactor.execute(data)
    return output

}