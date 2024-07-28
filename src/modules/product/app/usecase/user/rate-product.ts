import StatusCode from "../../../infrastructure/config/staus-code"
import IRepository from "../../../infrastructure/interface/IRepository"



class RateProduct {


    private repository: IRepository

    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input): Promise<Output> {

        try {


            // check product exist or not
            const product = await this.repository.getProduct(data.productId)
            if (!product) return {
                response: { message: "Product not found" },
                status: StatusCode.NOT_FOUND
            }


            // check already done rating
            const feedBackExist = this.checkFeedback(product.feedbacks, data.userId)
            if(!feedBackExist.success) return {
                response : { message : feedBackExist.message},
                status : feedBackExist.status
            }


            // work status 
            // -- done already feedback done 
            // pending -- update rating -- if rating only or along with comment
            if(data.comment){
                const updated = await this.repository.ratingWithComment(data)
            }
            const updated = await this.repository.productRating(data)

            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Product rating failed" },
                status: StatusCode.INTERNAL_ERROR
            }
        }

        //demo response


    }



    // method to check that already feedback exist or not
    checkFeedback(feedbacks: { userId: string, rating: number, comment: string }[], userId: string): FeedBackCheck {

        for(let i = 0 ; i < feedbacks.length ; i++){
            if(String(feedbacks[i].userId) == String(userId)) return {
                message : "You have already done your feedback",
                status : StatusCode.CONFLICT,
                success : false
            }
        }

        return { 
            message : "",
            status : StatusCode.OK,
            success : true
        }
    }


}

export default RateProduct

interface Input {
    productId: string
    userId: string
    comment: string
    rating: number
}


interface Output {
    response: { message: string },
    status: StatusCode
}


interface Dependencies {
    repository: IRepository
}


interface FeedBackCheck {
    message: string
    status: StatusCode
    success: boolean
}