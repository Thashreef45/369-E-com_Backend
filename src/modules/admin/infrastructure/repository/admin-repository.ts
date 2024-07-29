import adminModel from "../database/admin-model";
import IRepository from "../interface/IRepository";

class AdminRepository implements IRepository {

    async findByEmail(email: string): Promise<any> {
        const data = await adminModel.findOne({email:email})
        return data
    }


    async findById(id: string) : Promise<any> {
        const data = await adminModel.findOne({_id:id})
    }


    async updateProfile(data: {
        email: string, whatsapp: string, phone: string
    }) : Promise<any> {
        const updated = await adminModel.updateOne(
            {email:data.email},
            {
                $set : {
                    whatsapp : data.whatsapp,
                    phone : data.phone
                }
            }
        )

        return updated
    }

}



export default AdminRepository












