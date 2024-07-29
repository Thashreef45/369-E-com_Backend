
import Repository from '../../../../infrastructure/repository/repository'


//usecase
import FetchVendor from '../../../usecase/B2B/fetch-vendor'


// repository instance
const repository = new Repository()


/** Fetch vendor with id */
export const fetchVendorWithId = async(id:string) => {
    
    const dependencies = {
        repository: repository
    }
    const data = { id }

    const interactor = new FetchVendor(dependencies)
    const output = await interactor.execute(data)
    return output
}

