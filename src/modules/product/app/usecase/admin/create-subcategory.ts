import IRepository from "../../../infrastructure/interface/IRepository"
import StatusCode from '../../../infrastructure/config/staus-code'


class CreateSubCategory {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {


        try {
            // checks that category exist or not
            const isExist = await this.repository.getCategoryById(data.categoryId)
            if (!isExist) return {
                response: { message: "Category not exist" }, status: StatusCode.NOT_FOUND
            }


            // checks that sub-category already exist or not
            const subCategoryNotExist = this.checkSubCategory(data.name, isExist?.subcategories)
            if (!subCategoryNotExist) return {
                response: { message: "Sub-Category already exist" }, status: StatusCode.CONFLICT
            }


            ///
            const subcategory = { name: data.name, description: data.description }
            const updated = await this.repository.createSubCategory(data.categoryId, subcategory)
            return {
                response: { message: "Success",}, status: StatusCode.CREATED
            }

        } catch (error) {
            return {
                response: { message: "Error creating sub-category" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


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
    response: { message: string, data?: {} }
    status: StatusCode
}

