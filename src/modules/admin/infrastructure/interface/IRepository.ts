interface IRepository {
    findByEmail(email: string): Promise<any>
    findById(id: string): Promise<any>

    /** Update profile */
    updateProfile(data: {
        email: string, whatsapp: string, phone: string
    }) : Promise<any>
}

export default IRepository