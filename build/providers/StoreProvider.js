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
exports.StoreProvider = void 0;
const StoreModel_1 = __importDefault(require("../models/StoreModel"));
class StoreProvider {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StoreModel_1.default.find().catch(err => null);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StoreModel_1.default.findOne({ "_id": id }, { '__v': 0 }).catch(err => null);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StoreModel_1.default.findOne({ "name": name }, { '__v': 0 }).catch(err => null);
        });
    }
    create(name, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StoreModel_1.default.create({
                name
            });
        });
    }
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { "name": name };
            return yield StoreModel_1.default.updateOne({ "_id": id }, updateData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StoreModel_1.default.findByIdAndDelete(id);
        });
    }
}
exports.StoreProvider = StoreProvider;
//# sourceMappingURL=StoreProvider.js.map