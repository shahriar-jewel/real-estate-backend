import { IUser, Role } from "../core/IUserProvider";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: false },
    username:{ type: String, required: true },
    password: { type: String, required: false },
    avatar: { type: String, required: false, default: null },
    role: { type: String, required: true, default: "User" },
    businessInfo: {
        companyId: { type: String, required: false },
        companyName: { type: String, required: false },
    },
    stores: [{
        _id: false,
        id: { type: String, required: false },
        storeName: { type: String, required: false },
    }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

UserSchema.index({ username: "text" }, { unique: true } );
export default mongoose.model<IUser>("Users", UserSchema);