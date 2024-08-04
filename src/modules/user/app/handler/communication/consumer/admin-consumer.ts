//Repository
import UserRepository from "../../../../infrastructure/repository/user-repository"



import CreateMembership from "../../../usecase/create-membership"
import UpdateMembership from "../../../usecase/update-membership"

import FetchUserById from "../../../usecase/fetch-user-by-id"


//Repository instance
const repository = new UserRepository()



/** Creates new Membership */
export const createMembership = (data: {
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}) => {

    const dependencies = {
        repository
    }
    // data = {...data},

    const interactor = new CreateMembership(dependencies)
    const response = interactor.execute(data)
    return response

}


/** update exist Membership */
export const updateMembership = (data: {
    membershipId: string,
    name: string,
    description: string,
    price: number,
    features: string[],
    thumbanail: string,
}) => {

    const dependencies = {
        repository
    }
    // data = data

    const interactor = new UpdateMembership(dependencies)
    const response = interactor.execute(data)
    return response
}




/** Fetch user with userId */
export const fetchUser = (userId: string): Promise<any> => {

    const dependencies = {
        repository
    }
    const data = { userId }

    const interactor = new FetchUserById(dependencies)
    const response = interactor.execute(data)
    return response
}