interface IRepository {

    findByPhone(phone: string): any

    createUser(phone: string, otp: string): any
    updateOtp(phone: string, otp: string): any

    addToCart(phone: string, productId: string): any
    updateCartProductCount(phone: string, productId: string, count: number): any
    removeFromCart(phone: string, productId: string): any

    addToWishlist(phone: string, productId: string): any
    removeFromWishlist(phone: string, productId: string): any

    addNewAddress(phone: string, address: { name: string, phone: string, address: string, pin: string }): any
    removeAddress(phone: string, addressId: string): any
    updateAddress(phone: string, addressId: string, address: { name: string, phone: string, address: string, pin: string }): any

}

export default IRepository