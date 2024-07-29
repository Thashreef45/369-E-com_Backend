
import AdminRepository from "../../../../infrastructure/repository/admin-repository"


//usecase
import FetchAdmin from '../../../usecase/B2B/fetch-admin'

const repository = new AdminRepository()

/** Fetch admin with id */
export const fetchAdmin = async (id: string) => {
    const dependencies = {
        repository: repository
    }

    const data = { id }

    const interactor = new FetchAdmin(dependencies)
    const output = await interactor.execute(data)
    return output

}