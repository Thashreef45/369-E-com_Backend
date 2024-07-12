import vendorModel from "../database/vendor-model"
import IRepository from "../interface/IRepository"


class Repository implements IRepository {
    // constructor(){}


    // registering a new vendor
    async registratioin(data: {
        name: string, phone: string, email: string,
        about: string, password: string, otp: string
    }) {
        try {

            const vendor = await vendorModel.create({
                name:data.name,
                email:data.email,
                phone:data.phone,
                password : data.password,
                otp : data.otp
            })

            return vendor

        } catch (error) {
            throw new Error("Error registering vendor")
        }
    }



    async fetchVendorWithId(id: string) {
        try {
            const vendor = await vendorModel.findOne({ _id: id })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }


    async fetchVendorWithEmail(email: string) {
        try {
            const vendor = await vendorModel.findOne({ email })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }

    async fetchVendorWithPhone(email: string) {
        try {
            const vendor = await vendorModel.findOne({ email })
            return vendor
        } catch (error) {
            throw new Error("Error fetching vendor")
        }
    }





}

export default Repository