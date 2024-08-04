import StatusCode from "../../../infrastructure/config/staus-code"
// import IRepository from "../../../infrastructure/interface/IRepository"


class FetchPemissionRequest {


    // private repository: IRepository
    private fetchVendorApprovals: () => Promise<Vendor[]>
    constructor(dependencies: Dependencies) {
        this.fetchVendorApprovals = dependencies.fetchVendorApprovals
    }


    async execute(data: Input): Promise<Output> {

        try {

            //fetch vendors
            const vendors = await this.fetchVendorApprovals()
            //map vendors data
            const resData = this.VendorMapper(vendors)

            return {
                response: { message: "Success", data: resData },
                status: StatusCode.OK
            }
        } catch (error) {
            return {
                response: { message: "Error fetching vendors" },
                status: StatusCode.INTERNAL_ERROR
            }
        }
    }



    /** Method will map the vendors data  */
    private VendorMapper(vendors: Vendor[]): Vendor[] {

        return vendors.map(x => ({
            _id: x._id,
            name: x.name,
            // about: x.about,
            email: x.email,
            whatsapp: x.whatsapp,
            phone: x.phone
        }))
    }
}



export default FetchPemissionRequest


interface Input {
    email: string
}

interface Output {
    response: { message: string, data?: Vendor[] },
    status: StatusCode
}

interface Dependencies {
    // repository: IRepository
    fetchVendorApprovals(): Promise<Vendor[]>
}


interface Vendor {
    _id: string
    name: string,
    phone: string,
    email: string,
    whatsapp: string,
    about?: string,
    
    // active: boolean

    // otp : {
    //     number : string,
    //     verified : boolean,
    // },
}