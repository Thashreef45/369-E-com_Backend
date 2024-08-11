import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-B2B"


class FetchAllCategories {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(): Promise<{}[]> {


        try {
            const data : Categories[] = await this.repository.fetchAllCategories()
            return data

        } catch (error) {
            
            throw new Error("Error fetching categories")
        }
    }
}

export default FetchAllCategories

interface Categories {
    _id : string ,name : string , description : string
}

interface Dependencies {
    repository: IRepository
}