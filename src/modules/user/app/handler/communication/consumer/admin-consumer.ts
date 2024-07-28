import UserRepository from "../../../../infrastructure/repository/user-repository"



import CreateMembership from "../../../usecase/create-membership"
import UpdateMembership from "../../../usecase/update-membership"

const repository = new UserRepository()

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