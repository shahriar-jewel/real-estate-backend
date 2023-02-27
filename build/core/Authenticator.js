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
exports.Authenticator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Middleware_1 = require("./Middleware");
const crypto_1 = __importDefault(require("crypto"));
class Authenticator extends Middleware_1.Middleware {
    constructor(app) {
        super();
        this.app = app;
        this.AUTH_COOKIE_NAME = "__session_auth";
    }
    authenticate(username, password, remember) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.app.UserProvider.get(username);
            if (!user || !user.isActive || user.password !== this.digestPassword(password))
                return (req, res) => false;
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                name: user.fullName,
                username: user.username,
                role: user.role,
                signedAt: new Date(),
                remember,
                check: user.password.substr(0, 6)
            }, this.app.config.sessionSecret);
            const cookieName = this.AUTH_COOKIE_NAME;
            return (req, res) => {
                if (token) {
                    if (remember) {
                        res.cookie(cookieName, token, { httpOnly: true, signed: true, sameSite: "strict", maxAge: 30 * 24 * 60 * 60 });
                    }
                    else {
                        res.cookie(cookieName, token, { httpOnly: true, signed: true, sameSite: "strict" });
                    }
                    return true;
                }
                else {
                    return false;
                }
            };
        });
    }
    digestPassword(pass) {
        return crypto_1.default.createHmac('sha256', this.app.config.authSecret)
            .update(`${pass} - ${this.app.config.authSalt}`)
            .digest('hex');
    }
    reSign(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const user = yield this.app.UserProvider.get(req.user.username);
                if (!user || !user.isActive || req.user.check !== user.password.substr(0, 6)) {
                    req.user = null;
                    resp.clearCookie(this.AUTH_COOKIE_NAME);
                    return;
                }
                req.user.name = user.fullName;
                req.user.role = user.role;
                req.user.signedAt = new Date();
                const token = jsonwebtoken_1.default.sign(req.user, this.app.config.sessionSecret);
                if (req.user.remember) {
                    resp.cookie(this.AUTH_COOKIE_NAME, token, { httpOnly: true, signed: true, sameSite: "strict", maxAge: 30 * 24 * 60 * 60 });
                }
                else {
                    resp.cookie(this.AUTH_COOKIE_NAME, token, { httpOnly: true, signed: true, sameSite: "strict" });
                }
            }
        });
    }
    process(req, resp, next) {
        if (req.signedCookies[this.AUTH_COOKIE_NAME]) {
            try {
                req.user = jsonwebtoken_1.default.verify(req.signedCookies[this.AUTH_COOKIE_NAME], this.app.config.sessionSecret);
                this.reSign(req, resp).then(() => next());
            }
            catch (ex) {
                next();
            }
        }
        else {
            next();
        }
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map