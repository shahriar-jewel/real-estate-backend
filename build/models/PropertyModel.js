"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const PropertySchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    soldPrice: { type: Number, required: false, default: null },
    bedrooms: { type: Number, required: true },
    bedroomsPartial: { type: Number, required: false, default: null },
    bathrooms: { type: Number, required: true },
    bathroomsPartial: { type: Number, required: false, default: null },
    squareFootage: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    isVow: { type: Boolean, required: false, default: true },
    isCrea: { type: Boolean, required: false, default: true },
    isItsoVow: { type: Boolean, required: false, default: true },
    isRental: { type: Boolean, required: false, default: true },
    unitNumber: { type: String, required: false, default: null },
    streetNumber: { type: String, required: false, default: null },
    streetName: { type: String, required: true },
    neighbourhoodName: { type: String, required: false, default: null },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    imageDesc: { type: String, required: false, default: null },
    addedAt: { type: Date, required: true },
    expiredAt: { type: Date, required: false, default: null },
    soldAt: { type: Date, required: false, default: null },
    path: { type: String, required: true },
    province: { type: String, required: true },
    addressPath: { type: String, required: true },
    status: { type: String, required: false, default: 'Available' },
    lastStatus: { type: String, required: false, default: null },
    isImageReady: { type: Boolean, required: false, default: true },
    position: {
        type: { type: String, required: false, default: 'Point' },
        coordinates: { type: [], required: true },
    },
    neighbourhood: { type: String, required: false, default: null },
    addressSlug: { type: String, required: false, default: null },
    availableAt: { type: Date, required: false, default: null },
    mlsNum: { type: String, required: true, unique: true },
    postalCode: { type: String, required: true },
    imageUrls: { type: [], required: true },
    thumbnailUrls: { type: [], required: true },
    misc: { type: String, required: false, default: null },
    virtualTourUrl: { type: String, required: false, default: null },
    description: { type: String, required: false, default: null },
    brokerage: { type: String, required: false, default: null },
    disclaimer: { type: String, required: false, default: null },
    type: { type: String, required: false, default: null },
    levels: { type: String, required: false, default: null },
    locker: { type: String, required: false, default: null },
    parking: { type: String, required: false, default: false },
    maintenanceFees: { type: String, required: false, default: null },
    taxes: { type: String, required: false, default: null },
    exterior: { type: String, required: false, default: null },
    basement: { type: String, required: false, default: null },
    garage: { type: String, required: false, default: null },
    driveway: { type: String, required: false, default: false },
    pool: { type: Boolean, required: false, default: false },
    heat: { type: String, required: false, default: false },
    ac: { type: String, required: false, default: false },
    heatingFuel: { type: String, required: false, default: false },
    rooms: [{
            type: { type: String, required: false, default: null },
            level: { type: String, required: false, default: null },
            width: { type: String, required: false, default: null },
            length: { type: String, required: false, default: null },
            unit: { type: String, required: false, default: null },
        }],
    extras: { type: String, required: false, default: null },
    openHouses: { type: String, required: false, default: null },
    lotFrontage: { type: String, required: false, default: null },
    lotDepth: { type: String, required: false, default: null },
    style: { type: String, required: false, default: null },
    styleName: { type: String, required: false, default: null },
    url: { type: String, required: false, default: null },
    providerId: { type: String, required: false, default: null },
    termsOfUseRequired: { type: String, required: false, default: null }
}, { timestamps: true });
exports.default = mongoose_1.default.model("properties", PropertySchema);
//# sourceMappingURL=PropertyModel.js.map