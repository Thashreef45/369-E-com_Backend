import * as eventPublisher from '../../../../../product/app/handler/event-handlers/admin'

export const createNewCategory = async(name:string,description:string) => {
    const result = await eventPublisher.createCategory({name,description})
    return result
}