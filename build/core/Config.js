"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(obj) {
        const keys = Object.keys(obj);
        const confObj = this;
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(obj));
        return this.verify();
    }
    verify() {
        if (!this.port)
            this.port = 3000;
        return this;
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map