import IRepository from "../../../../infrastructure/interface/IRepository"


class FetchFeedbacks {


    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }


    async execute(data: Input) {

        const feedbacks = await this.repository.getFeedbacks(data)
        return feedbacks

    }

}


export default FetchFeedbacks


interface Input {
    productId: string, page_no?: number, limit?: number
}

interface Dependencies {
    repository: IRepository
}