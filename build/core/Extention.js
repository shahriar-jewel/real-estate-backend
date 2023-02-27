"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extention = void 0;
const Middleware_1 = require("./Middleware");
class Extention extends Middleware_1.Middleware {
    process(req, resp, next) {
        resp.bag = {};
        resp.view = (view, options, callback) => {
            resp.bag = options ? Object.assign(Object.assign({}, resp.bag), options) : resp.bag;
            resp.render(view, resp.bag, callback);
        };
        next();
    }
}
exports.Extention = Extention;
//# sourceMappingURL=Extention.js.map