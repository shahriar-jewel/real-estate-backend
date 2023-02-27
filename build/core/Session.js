"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const uuid_1 = require("uuid");
const Middleware_1 = require("./Middleware");
class Session extends Middleware_1.Middleware {
    process(req, resp, next) {
        if (!req.signedCookies.__session) {
            resp.cookie("__session", this.createSession(), { path: "/", httpOnly: true, signed: true, sameSite: "strict" });
        }
        next();
    }
    createSession() {
        return JSON.stringify({ sessionId: (0, uuid_1.v4)(), time: new Date() });
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map