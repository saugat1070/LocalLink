import { Request,Response } from "express";
import { JsonResponse } from "../../utils/helper/response.helper.js";
import { PingService } from "./ping.service.js";

class PingController {
    private pingService: PingService;

    constructor(pingService: PingService) {
        this.pingService = pingService;
    }

    async ping(req: Request, res: Response) {
        const result = await this.pingService.ping();
        return JsonResponse(res, 200, true, "Ping successful", { result });
    }
}

export default PingController;