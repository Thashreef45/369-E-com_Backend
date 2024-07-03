import StatusCode from '../../infrastructure/config/staus-code'

class AddProduct {

    private fetchUser
    private createProduct

    constructor(dependencies:Dependencies) {
        this.fetchUser = dependencies.fetchUser
        this.createProduct = dependencies.createProduct
    }

    async execute(data: Input): Promise<Output> {

        //checking the credentials
        if (!data.name || !data.description || !data.price ||
            !data.thumbnail || !data.categoryId || !data.quantity
        ) return {
            response: { message: "Credentials missing" },
            status: StatusCode.BAD_REQUEST
        }

        try {

            // fetch User 
            const user = await this.fetchUser(data.phone)
            if (!user) return {
                response: { message: "User not found" },
                status: StatusCode.NOT_FOUND
            }


            data.userId = user._id


            // product creation
            const updated = await this.createProduct(data)
            return {
                response : updated.response,
                status : updated.status
            }


        } catch (error) {
            
            return {
                response: { message: "Error adding product" },
                status: StatusCode.INTERNAL_ERROR
            }

        }
    }
}


export default AddProduct

interface Input {
    name: string,
    description: string,
    price: number,
    thumbnail: string,
    categoryId: string,
    quantity: number,
    userId: string

    // pending -- have to implement in middleware
    phone : string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    fetchUser(phone:string) : {}
    createProduct(data:Input):any
}