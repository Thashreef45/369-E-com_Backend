interface IRepository {

    findByPhone(phone: string): Promise<any>

    /** Fetch user by userId */
    findById(userId: string): Promise<any>


    createUser(phone: string, otp: string): Promise<any>
    updateOtp(phone: string, otp: string): Promise<any>

    addToCart(phone: string, productId: string): Promise<any>
    updateCartProductCount(phone: string, productId: string, count: number): Promise<any>
    removeFromCart(phone: string, productId: string): Promise<any>

    addToWishlist(phone: string, productId: string): Promise<any>
    removeFromWishlist(phone: string, productId: string): Promise<any>

    addNewAddress(phone: string, address: { name: string, phone: string, address: string, pin: string }): Promise<any>
    removeAddress(phone: string, addressId: string): Promise<any>
    updateAddress(phone: string, addressId: string, address: { name: string, phone: string, address: string, pin: string }): Promise<any>


    /** create new membership (admin role)*/
    createMembership(data: {
        name: string, description: string, price: number, features: string[], thumbanail: string
    }): Promise<any>


    findMembershipByName(name: string): Promise<any>

    findMembershipById(id: string): Promise<any>


    updateMembership(data: {
        membershipId: string, name: string, description: string,
        price: number, features: string[], thumbanail: string
    }): Promise<any>



    /** Method only fetchs the user name and phone */
    fetchUsersByIds(userIds: string[]): Promise<any>


}

export default IRepository