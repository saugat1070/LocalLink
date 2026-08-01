import mongoose from "mongoose";

export type Provider  = "google" | "github" | "local";

export interface IAuthenticationModel {
    firstName: string;
    lastName: string;
    email: string;
    provider: Provider;
    providerId?: string;
    avatarUrl?: string;
    password?: string;
    socketId?: string;
    roomId?: string;
}

const authenticationSchema = new mongoose.Schema<IAuthenticationModel>({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return value.trim().length > 0;
            },
            message: "please provide a first name",
        },
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return value.trim().length > 0;
            },
            message: "please provide a last name",
        },
    },
    avatarUrl:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: "Invalid email format",
        },
    },
    provider: {
        type: String,
        enum: ["google", "github", "local"],
        default: "local",
        required: true,
    },
    providerId: {
        type: String,
        required: function (this){
            return this.provider !== "local";
        }
    },
    password: {
        type: String,
        required: function (this){
            return this.provider === "local";
        }
    },
    socketId: {
        type: String,
    },
    roomId: {
        type: String,
    },
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


authenticationSchema.virtual("fullName").get(function(this: IAuthenticationModel){
    return `${this.firstName} ${this.lastName}`;
});

authenticationSchema.index({email:1, provider:1}, {unique: true});
authenticationSchema.index({providerId:1, provider:1});

export const AuthenticationModel = mongoose.model<IAuthenticationModel>("Authentication", authenticationSchema);

function emailValidator(value: string){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}