import { compare } from 'bcrypt'

const verifyHash = async (pwd: string, hash: string) => {

    try {
        const verified = await compare(pwd, hash)
        return verified

    } catch (error) {
        throw new Error("Hash verification failed")
    }

}

export default verifyHash