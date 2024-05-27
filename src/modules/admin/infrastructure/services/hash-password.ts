import { hash, compare } from 'bcrypt'


export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const result = await compare(password, hashedPassword)
    return result ? true : false
}

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 8
    return await hash(password, saltRounds)
}