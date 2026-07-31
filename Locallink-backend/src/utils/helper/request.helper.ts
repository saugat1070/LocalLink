import { AsyncLocalStorage } from "node:async_hooks";

type AsyncLocalStorageType = {
    correlationId: string;
}
// instance of async local storage to store async data across the application
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>();
// To get the correlation ID from the async local storage
export const getCorrelationId = (): string =>{
    const store = asyncLocalStorage.getStore();
    return store?.correlationId || "unknown-correlation-id";
}