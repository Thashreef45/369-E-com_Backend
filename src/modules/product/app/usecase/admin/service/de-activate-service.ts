import StatusCode from "../../../../infrastructure/config/staus-code"
import IRepository from "../../../../infrastructure/interface/IRepository-services"


class DeActivateService {

    private repository: IRepository
    constructor(dependencies: Dependencies) {
        this.repository = dependencies.repository
    }

    async execute(data: Input): Promise<Output> {

        try {

            const service = await this.repository.fetchAServiceById(data.serviceId)
            if (!service) return {
                response: { message: "Service not found" },
                status: StatusCode.NOT_FOUND
            }


            //check ownership   *authentic owner or not
            if (String(service.ownerId) != String(data.ownerId)) return {
                response: { message: "You are not authorized to update this service" },
                status: StatusCode.UNAUTHORIZED
            }


            //check conflict in de-activating
            if(!service.active) return {
                response : { message : "Service is already inactive"},
                status : StatusCode.CONFLICT
            }


            const deactivated = await this.repository.deactivateService(data.serviceId)
            return {
                response: { message: "Success" },
                status: StatusCode.OK
            }

        } catch (error) {

            return {
                response: { message: "Error updating service" },
                status: StatusCode.INTERNAL_ERROR
            }
        }


    }
}


export default DeActivateService


interface Input {
    serviceId: string, ownerId: string
}

interface Output {
    response: { message: string },
    status: StatusCode
}

interface Dependencies {
    repository: IRepository
}