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
exports.CategoryProvider = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
class CategoryProvider {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryModel_1.default.find().catch(err => null);
        });
    }
    getById(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryModel_1.default.findOne({ "_id": catId }, { 'createdAt': 0, "updatedAt": 0, "__v": 0 }).catch(err => null);
        });
    }
    create(name, slug, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CategoryModel_1.default.create({
                name,
                slug,
                parent
            });
        });
    }
}
exports.CategoryProvider = CategoryProvider;
//# sourceMappingURL=CategoryProvider.js.map