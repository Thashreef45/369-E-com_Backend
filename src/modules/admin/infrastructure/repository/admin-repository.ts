import adminModel from "../database/admin-model";
import IRepository from "../interface/IRepository";

class AdminRepository implements IRepository {

    async findByEmail(email: string): Promise<any> {
        const data = await adminModel.findOne({email:email})
        return data
    }

}



export default AdminRepository












