class PingRepository {
    async ping(): Promise<string> {
        return "pong";
    }
}

export default PingRepository;