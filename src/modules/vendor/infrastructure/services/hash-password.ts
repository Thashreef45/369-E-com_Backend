import { hash } from "bcrypt";


// salt rounds
const saltRounds = 8


const hashPassword = async(pwd:string) => {

    const hashedPw = await hash(pwd,saltRounds)
    return hashedPw

}


export default hashPassword