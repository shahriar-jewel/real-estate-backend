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
const IWeightDataProvider_1 = require("../core/IWeightDataProvider");
const VehicleWeightDataSchema = new mongoose_1.Schema({
    serialNo: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    driverName: { type: String, required: false, default: null },
    stationId: { type: String, required: true },
    weightData: [{
            _id: false,
            time: { type: Date, required: true },
            weight: { type: Number, required: true },
            unit: { type: IWeightDataProvider_1.IWeightUnits, required: true },
            challan: {
                type: {
                    party: {
                        id: { type: String, required: true },
                        name: { type: String, required: true },
                        address: { type: String, required: true },
                    },
                    section: { type: String, required: true },
                    tare: { type: String, required: false, default: null },
                    challanNo: { type: String, required: true },
                    lCNo: { type: String, required: true },
                    challanType: { type: IWeightDataProvider_1.IChallanTypes, required: true },
                    products: [{
                            _id: false,
                            id: { type: String, required: true },
                            name: { type: String, required: true },
                            quantity: { type: Number, required: true },
                            unit: { type: String, required: false, default: null },
                        }]
                },
                default: null
            },
            user: {
                id: { type: String, required: true },
                fullName: { type: String, required: true },
            },
            updatedBy: {
                id: { type: String, required: false, default: null },
                fullName: { type: String, required: false, default: null },
            },
            flag: { type: Number, required: false, default: 0 },
        }],
    flag: { type: Number, required: false, default: 0 }
}, { timestamps: true });
VehicleWeightDataSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.default.model("vehicle_weights", VehicleWeightDataSchema);
//# sourceMappingURL=WeightDataModel.js.map