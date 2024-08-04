import StatusCode from "../../../infrastructure/config/staus-code"


class FetchAVendor {

    private fetchVendor: (vendorId: string) => Promise<any>
    constructor(dependencies: Dependencies) { }


    async execute(data: Input): Promise<Output> {

        try {

            if(!data.vendorId) return {
                response : { message : 'Credentials missing'},
                status : StatusCode.INTERNAL_ERROR
            }

            //fetch vendor
            const vendor = await this.fetchVendor(data.vendorId)
            if(!vendor) return {
                response : { message : "Vendor not found"},
                status : StatusCode.NOT_FOUND
            }

            //map vendors data
            const resData = this.VendorMapper(vendor)

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
            about: x.about,
            email: x.email,
            whatsapp: x.whatsapp,
            phone: x.phone
        }))
    }
}

export default FetchAVendor


interface Input {
    email: string
    vendorId: string
}


interface Output {
    response: { message: string, data?: Vendor[] },
    status: StatusCode
}


interface Dependencies {
    fetchVendor(vendorId: string): Promise<any>
}

interface Vendor {
    _id : string
    name: string,
    phone: string,
    email: string,
    whatsapp: string,
    about: string,

    // active: boolean

    // otp : {
    //     number : string,
    //     verified : boolean,
    // },
}