
declare global{
    namespace Express{
        interface Request{
            correlationId: string;
            userId: string | mongoose.Types.ObjectId;
            user: any;
            refreshId: string | mongoose.Types.ObjectId
        }
    }
}
export {};
