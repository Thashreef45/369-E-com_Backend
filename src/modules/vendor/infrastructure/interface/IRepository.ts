
interface IRepository {
    registratioin (data: {name: string,phone: string,
        email: string,about: string,password: string,otp : string}
    ) : any

    verifyOtp(email: string) : any

    fetchVendorWithId (id:string) : any
    fetchVendorWithEmail (email:string) : any
    fetchVendorWithPhone (email:string) : any


}

export default IRepository