
//Repository
import Repository from '../../../../infrastructure/repository/repository'
import ActivateVendor from '../../../usecase/B2C/activate-vendor'
import FetchAVendor from '../../../usecase/B2C/fetch-a-vendor'


//usecase
import FetchVendorApprovals from '../../../usecase/B2C/get-pending-approvals'


// repository instance
const repository = new Repository()



/** Fetch registration pending / approval pending vendor accounts */
export const fetchVendorApprovals = async (): Promise<any> => {

    const dependencies = {
        repository
    }
    const interactor = new FetchVendorApprovals(dependencies)
    const output = await interactor.execute()
    return output
}



/** Fetch a vendor account with vendorId *_id*/
export const fetchAVendor = async (vendorId: string): Promise<any> => {

    const dependencies = {
        repository
    }
    const data = { vendorId }

    const interactor = new FetchAVendor(dependencies)
    const output = await interactor.execute(data)
    return output
}



/** Fetch a vendor account */
export const activateVendor = async (vendorId: string): Promise<any> => {

    const dependencies = {
        repository
    }
    const data = { vendorId }

    const interactor = new ActivateVendor(dependencies)
    const output = await interactor.execute(data)
    return output
}

