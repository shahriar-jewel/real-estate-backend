"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProvider = void 0;
const VendorModel_1 = __importDefault(require("../models/VendorModel"));
class VendorProvider {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VendorModel_1.default.find().catch(err => null);
        });
    }
    getLastItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VendorModel_1.default.findOne({ '__v': 0 }).sort('-updatedAt').catch(err => null);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VendorModel_1.default.findOne({ "_id": id }, { '__v': 0 }).catch(err => null);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VendorModel_1.default.findOne({ "name": name }, { '__v': 0 }).catch(err => null);
        });
    }
    create(name, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield VendorModel_1.default.create({
                name,
                address,
            });
        });
    }
    update(id, name, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { "name": name, "address": address };
            return yield VendorModel_1.default.updateOne({ "_id": id }, updateData);
        });
    }
}
exports.VendorProvider = VendorProvider;
//# sourceMappingURL=VendorProvider.js.map