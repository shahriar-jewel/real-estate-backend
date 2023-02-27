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
exports.PropertyProvider = void 0;
const PropertyModel_1 = __importDefault(require("../models/PropertyModel"));
class PropertyProvider {
    create(propertyData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PropertyModel_1.default.create(Object.assign({}, propertyData));
        });
    }
    getAll(page = 1, size = 6, searchStr) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter;
            if (searchStr) {
                filter = { "$or": [{ "mlsNum": { $regex: searchStr, $options: 'i' } }, { "streetName": { $regex: searchStr, $options: 'i' } }, { "styleName": { $regex: searchStr, $options: 'i' } }] };
            }
            const count = yield PropertyModel_1.default.countDocuments(filter);
            const lastPage = Math.ceil(count / size);
            return {
                properties: yield PropertyModel_1.default.find(filter).skip(size * (page - 1)).limit(size),
                size,
                page,
                lastPage,
                count
            };
        });
    }
}
exports.PropertyProvider = PropertyProvider;
//# sourceMappingURL=PropertyProvider.js.map