
interface IRepository {
    registratioin(data: {
        name: string, phone: string,
        email: string, about: string, password: string, otp: string, whatsapp: string
    }
    ): Promise<any>

    verifyOtp(email: string): Promise<any>

    updateNewOTP(data:{otp:string,email:string}) : Promise<any>

    fetchVendorWithId(id: string): Promise<any>
    fetchVendorWithEmail(email: string): Promise<any>
    fetchVendorWithPhone(email: string): Promise<any>

    /**Fetch approval pending vendors */
    fetchPendingApprovals() : Promise<any>


    /** Activate vendor account -* admin role */
    activateVendor(vendorId:string): Promise<any>


}

export default IRepository