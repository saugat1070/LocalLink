import mongoose from "mongoose";

export interface IRefreshModel{
    userId: mongoose.Types.ObjectId | string,
    refreshToken: string,
    isValid?: boolean
    createdAt?: Date
}

const refreshSchema = new mongoose.Schema<IRefreshModel>({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const RefreshModel = mongoose.model<IRefreshModel>("Refresh", refreshSchema);