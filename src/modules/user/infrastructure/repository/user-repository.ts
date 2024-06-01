import userModel from "../database/user-model";
import IRepository from "../interface/IRepository";

class UserRepository implements IRepository {

    async findByPhone(phone: string): Promise<any> {
        const data = await userModel.findOne({ phone: phone })
        return data
    }


    async createUser(phone: string, otp: string) {
        const newUser = new userModel({
            phone,
            otp: otp
        })
        await newUser.save()

        // return ""
    }

    async updateOtp(phone: string, otp: string) {
        const result = await userModel.updateOne({ phone: phone }, {
            $set: {
                otp: otp
            }
        })

        // todo : handling issuse on data fetching,
        // if(!result.matchedCount){
        //     return { status:404 }
        // } return {status:200}
    }

    async addToCart(phone: string, productId: string) {
        const result = await userModel.updateOne(
            { phone: phone },
            {
                $addToSet: {
                    cart: {
                        product_id: productId,
                        quantity: 1
                    }
                }
            }
        );
        return result
    }


    async updateCartProductCount(phone: string, productId: string, count: number) {
        await userModel.updateOne(
            { phone: phone, "cart.productId": productId },
            {
                $set: { "cart.$.quantity": count }
            }
        )
    }


    async removeFromCart(phone: string, productId: string) {
        await userModel.updateOne(
            { phone: phone, "cart.productId": productId },
            {
                $pull: {
                    cart: { product_id: productId }
                }
            }
        )
    }



    // Add to wishlist
    async addToWishlist(phone: string, productId: string) {
        const result = await userModel.updateOne(
            { phone: phone },
            {
                $addToSet: {
                    wishlist: productId
                }
            }
        );
        return result
    }


    // remove from wishlist
    async removeFromWishlist(phone: string, productId: string) {
        await userModel.updateOne(
            { phone: phone, "cart.productId": productId },
            {
                $pull: {
                    wishlist: productId
                }
            }
        )
    }


    // add new address
    async addNewAddress(phone: string, address:{name:string,phone:string,address:string,pin:string}) {
        await userModel.updateOne(
            { phone: phone },
            {
                $push: {
                    address: {
                        name : address.name,
                        phone :  address.phone,
                        address : address.address,
                        pin : address.pin
                    }
                }
            }
        )
    }

    //patch update address
    async updateAddress(phone : string,addressId : string,address :{name:string,phone:string,address:string,pin:string}) {
        await userModel.updateOne(
            { phone: phone, "address._id": addressId },
            {
                $set: {
                    "address.$.name": address.name,
                    "address.$.phone": address.phone,
                    "address.$.address": address.address,
                    "address.$.pin": address.pin
                }
            }
        )
    }
    

    // remove an address
    async removeAddress(phone: string, addressId: string) {
        await userModel.updateOne(
            { phone: phone, "address._id": addressId },
            {
                $pull: {
                    address: { _id: addressId }
                }
            }
        )
    }
}



export default UserRepository












