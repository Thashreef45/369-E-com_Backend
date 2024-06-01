import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from '../../../infrastructure/config/staus-code'


class CreateSubCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        const isExist = await this.repository.getCategoryById(data.categoryId)
        // return if category not exist
        if (!isExist) return {
            response: { message: "Category not exist" }, status: StatusCode.NOT_FOUND
        }


        // returns true if subcategory not exist , otherwise returns false
        const subCategoryNotExist = this.checkSubCategory(data.name, isExist?.subcategories)

        if (!subCategoryNotExist) return {
            response: { message: "Sub-Category already exist" }, status: StatusCode.CONFLICT
        }


        const updated = await this.createSubCategory(data)
        // response after creating the sub-category
        return {
            response: { message: "Sub-Category created" }, status: StatusCode.CREATED
        }


    }

    // sub-category creation 
    private async createSubCategory(data: Input) {

        const subcategory = {
            name: data.name, description: data.description
        }

        const created = await this.repository.createSubCategory(data.categoryId, subcategory)

    }


    // check that sub-category already exist or not 
    private checkSubCategory(name: string, data: { name: string, description: string }[]) {

        const filter = data.filter((x) => x.name == name)
        if (!filter.length) return true
        return false
    }
}


export default CreateSubCategory


interface Dependencies {
    repository: IRepository
}

interface Input {
    categoryId: string,
    name: string,
    description: string
}

interface Output {
    status: StatusCode
    response: Object
}

