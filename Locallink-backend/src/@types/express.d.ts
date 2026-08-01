
declare global{
    namespace Express{
        interface Request{
            correlationId: string;
            userId: string;
            user: any;
        }
    }
}
export {};
