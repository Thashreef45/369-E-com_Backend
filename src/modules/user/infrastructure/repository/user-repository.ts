import membershipModel from "../database/membership-model";
import userModel from "../database/user-model";
import IRepository from "../interface/IRepository";

class UserRepository implements IRepository {

    async findByPhone(phone: string): Promise<any> {
        const data = await userModel.findOne({ phone: phone })
        return data
    }

    /** Fetch user by userId */
    async findById(userId: string): Promise<any> {
        const data = await userModel.findOne({ _id: userId })
        return data
    }


    async createUser(phone: string, otp: string) {
        try {
            const newUser = new userModel({
                phone,
                otp: otp
            })
            await newUser.save()
        } catch (error: any) {
            // have to throw error

        }

        // return ""
    }

    async updateOtp(phone: string, otp: string) {
        try {
            const result = await userModel.updateOne({ phone: phone }, {
                $set: {
                    otp: otp
                }
            })
            return result
        } catch (error: any) {
            throw new Error("Error updating otp")
        }
        // todo : handling issuse on data fetching,
        // if(!result.matchedaddToCartCount){
        //     return { status:404 }
        // } return {status:200}
    }

    async addToCart(phone: string, productId: string) {
        const result = await userModel.updateOne(
            { phone: phone },
            {
                $addToSet: {
                    cart: {
                        productId,
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
                    cart: { productId }
                }
            }
        )
    }



    // Add to wishlist
    async addToWishlist(phone: string, productId: string) {
        const result = await userModel.updateOne(
            { phone: phone },
            {
                $push: {
                    wishlist: productId
                }
            }
        );
        return result
    }


    // remove from wishlist
    async removeFromWishlist(phone: string, productId: string) {
        try {
            const updated = await userModel.updateOne(
                { phone: phone },
                {
                    $pull: { wishlist: productId }
                }
            )
            console.log(updated, 'here is your updated data')
        } catch (error: any) {
            throw new Error('Error removing product from wishlist')
        }
    }


    // add new address
    async addNewAddress(phone: string, address: { name: string, phone: string, address: string, pin: string }) {
        try {
            await userModel.updateOne(
                { phone: phone },
                {
                    $push: {
                        address: {
                            name: address.name,
                            phone: address.phone,
                            address: address.address,
                            pin: address.pin
                        }
                    }
                }
            )
        } catch (error: any) {
            throw new Error('Error creating address')
        }
    }

    //patch update address
    async updateAddress(phone: string, addressId: string, address: { name: string, phone: string, address: string, pin: string }) {

        try {
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

        } catch (error: any) {
            throw new Error('Error updating address')
        }
    }



    // remove an address
    async removeAddress(phone: string, addressId: string) {

        try {
            await userModel.updateOne(
                { phone: phone, "address._id": addressId },
                {
                    $set: {
                        "address.$.active": false
                    }
                }
            )

        } catch (error: any) {
            throw new Error('Error removing address')
        }
    }




    /**Create membership -- admin role */
    async createMembership(data: {
        name: string,
        description: string,
        price: number,
        features: string[],
        thumbanail: string
    }) {
        try {
            const created = await membershipModel.create({
                name: data.name,
                description: data.description,
                price: data.price,
                features: data.features,
                thumbanail: data.thumbanail
            })

            await created.save()
            return created

        } catch (error: any) {
            throw new Error('Error creating membership')
        }
    }


    //fetch  membership by name
    async findMembershipByName(name: string) {
        try {
            const membership = await membershipModel.findOne({ name: name })
            return membership
        } catch (error: any) {
            throw new Error('Error finding membership')
        }
    }


    // fethch membership by Id
    async findMembershipById(id: string) {
        try {
            const membership = await membershipModel.findOne({ _id: id })
            return membership
        } catch (error: any) {
            throw new Error('Error finding membership')
        }
    }


    async updateMembership(data: {
        membershipId: string, name: string, description: string,
        price: number, features: string[], thumbanail: string
    }) {
        try {
            const updated = await membershipModel.updateOne(
                { _id: data.membershipId },
                {
                    $set: {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        features: data.features,
                        thumbanail: data.thumbanail
                    }
                }
            )

            return updated
        } catch (error: any) {
            throw new Error('Error updating membership')
        }
    }



    async fetchUsersByIds(userIds: string[]): Promise<any> {
        try {

            const users = await userModel.find(
                {
                    _id: {
                        $in: userIds
                    }
                },
                { name: 1, phone: 1 }
            ).exec()

            return users

        } catch (error: any) {
            throw new Error('Error fetching users')
        }
    }
}



export default UserRepository
