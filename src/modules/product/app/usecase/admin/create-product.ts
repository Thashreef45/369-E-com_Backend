import IRepository from "../../../infrastructure/interface/IRepository"

class CreateProduct {
    private repository : IRepository 
    constructor(){}



    execute(data:Input){}
}

export default CreateProduct


interface Dependencies {
    repository : IRepository
}

interface Input {

}