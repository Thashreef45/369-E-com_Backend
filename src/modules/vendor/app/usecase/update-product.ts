import StatusCode from "../../infrastructure/config/staus-code"



class UpdateProduct {

    private fetchUser
    private updateProduct

    constructor(dependencies: Dependencies) {
        this.fetchUser = dependencies.fetchUser
        this.updateProduct = dependencies.updateProduct
    }

    async execute(data: Input): Promise<Output> {

        //checking the credentials
        if (!data.name || !data.description || !data.price ||
            !data.thumbnail || !data.categoryId //|| !data.quantity
        ) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            // fetch user
            const user = await this.fetchUser(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }

            data.userId = user._id

            const updated:Output = await this.updateProduct(data)
            return {
                response: updated.response,
                status: updated.status
            }

        } catch (error) {
            return {
                response: { message: "Error updating product" },
                status: StatusCode.INTERNAL_ERROR
            }
        }



    }
}

export default UpdateProduct


interface Input {
    name: string,
    description: string,
    price: number,
    thumbnail: string,
    images: string[],
    categoryId: string,
    // quantity: string,
    productId: string,
    phone: string,
    userId?: string,
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchUser(userId: string): {}
    updateProduct(data: Input): {}
}