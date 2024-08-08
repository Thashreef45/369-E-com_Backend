import vendorModel from "../database/vendor-model"
import IRepository from "../interface/IRepository"


class Repository implements IRepository {
    // constructor(){}


    // registering a new vendor
    async registratioin(data: {
        name: string, phone: string, email: string,
        about: string, password: string, otp: string, whatsapp: string
    }): Promise<any> {
        try {

            const vendor = await vendorModel.create({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                whatsapp: data.whatsapp,

                otp: {
                    number: data.otp,
                    verified: false
                }
            })

            return vendor

        } catch (error) {
            throw new Error("Error registering vendor")
        }
    }

    async updateNewOTP(data: { otp: string, email: string }): Promise<any> {

        try {
            const update = await vendorModel.updateOne(
                { email: data.email },
                {
                    $set: { 'otp.number': data.otp }
                }
            )
        } catch (error) {
            throw new Error(error)
        }
    }



    async fetchVendorWithId(id: string): Promise<any> {
        try {
            const vendor = await vendorModel.findOne({ _id: id })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }


    async fetchVendorWithEmail(email: string): Promise<any> {
        try {
            const vendor = await vendorModel.findOne({ email })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }


    async fetchVendorWithPhone(email: string): Promise<any> {
        try {
            const vendor = await vendorModel.findOne({ email })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }


    async verifyOtp(email: string): Promise<any> {

        try {
            return await vendorModel.updateOne(
                { email },
                {
                    $set: {
                        otp: {
                            verified: true
                        }
                    }
                })

        } catch (error) {

            // console.log(error)
            throw new Error("Internal error")
        }
    }


    /**Fetch approval pending vendors */
    async fetchPendingApprovals(): Promise<any> {
        try {
            const vendors = await vendorModel.find({ active: false })
            return vendors
        } catch (error) {
            throw new Error(error)
        }
    }



    /** Activate vendor account -* admin role */
    async activateVendor(vendorId: string): Promise<any> {
        try {
            const updated = await vendorModel.updateOne(
                { _id: vendorId },
                {
                    $set: {
                        active: true
                    }
                }
            )

            return updated

        } catch (error) {
            throw new Error(error)
        }
    }




}

export default Repository