import PingRepository from "./ping.repository.js";

export class PingService {
    private pingRepository: PingRepository;
    
    constructor(pingRepository: PingRepository) {
        this.pingRepository = pingRepository;
    }
    async ping(): Promise<string> {
        return await this.pingRepository.ping();
    }
}