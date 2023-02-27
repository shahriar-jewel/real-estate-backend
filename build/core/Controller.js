"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Action_1 = require("./Action");
class Controller {
    Register(application) {
        this.Application = application;
        for (const key of application.getServiceNames()) {
            Object.defineProperty(this, key, {
                get() {
                    return application.get(key);
                }
            });
        }
        this.onRegister();
    }
    onRegister() {
    }
    onGet(route, callback, roles = []) {
        this.registerAction(Action_1.HttpMethods.GET, route, callback, roles);
    }
    onPost(route, callback, roles = []) {
        this.registerAction(Action_1.HttpMethods.POST, route, callback, roles);
    }
    onPut(route, callback, roles = []) {
        this.registerAction(Action_1.HttpMethods.PUT, route, callback, roles);
    }
    onPatch(route, callback, roles = []) {
        this.registerAction(Action_1.HttpMethods.PATCH, route, callback, roles);
    }
    onDelete(route, callback, roles = []) {
        this.registerAction(Action_1.HttpMethods.DELETE, route, callback, roles);
    }
    registerAction(method, route, callback, roles = []) {
        this.Application.registerAction(this, method, route, callback, roles);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map