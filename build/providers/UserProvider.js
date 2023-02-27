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
exports.UserProvider = void 0;
const IUserProvider_1 = require("../core/IUserProvider");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const SessionModel_1 = __importDefault(require("../models/SessionModel"));
class UserProvider {
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find().find().countDocuments();
        });
    }
    get(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ "username": username }).catch(err => null);
        });
    }
    getAll(page = 1, size = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageSize;
            const count = yield UserModel_1.default.find().countDocuments();
            let query;
            if (page === 0) {
                pageSize = count;
                query = yield UserModel_1.default.find({}, { password: 0 }).catch(err => null);
            }
            else {
                pageSize = size;
                query = yield UserModel_1.default.find({}, { password: 0 }).skip(size * (page - 1)).limit(size).catch(err => null);
            }
            return { size: pageSize, page, count, data: query };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(id, { password: 0 }).catch(err => null);
        });
    }
    create(fullName, username, password, role, businessInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create({
                fullName,
                username,
                password,
                avatar: "",
                role: IUserProvider_1.Role.Admin,
                businessInfo,
                stores: null,
                isActive: true
            });
        });
    }
    createSession(username, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield SessionModel_1.default.findOne({ "username": username });
            if (session) {
                return yield SessionModel_1.default.updateOne({ username }, { refreshToken });
            }
            else {
                return yield SessionModel_1.default.create({ username, refreshToken });
            }
        });
    }
    checkSession(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SessionModel_1.default.findOne({ "refreshToken": refreshToken }).catch(err => null);
        });
    }
}
exports.UserProvider = UserProvider;
//# sourceMappingURL=UserProvider.js.map