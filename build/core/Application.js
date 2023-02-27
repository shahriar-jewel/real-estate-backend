"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Action_1 = require("./Action");
const Dictionary_1 = require("./Dictionary");
const express_1 = __importDefault(require("express"));
const Authenticator_1 = require("./Authenticator");
const Session_1 = require("./Session");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const Extention_1 = require("./Extention");
const fs_1 = __importDefault(require("fs"));
class Application {
    constructor(config) {
        this.config = config;
        this.services = new Dictionary_1.Dictionary();
        this.Controllers = new Array();
        this.menus = new Dictionary_1.Dictionary();
        this.formatters = new Dictionary_1.Dictionary();
        this.set("Express", (0, express_1.default)());
        this.Express.use(body_parser_1.default.json());
        this.Express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.Express.use((0, cookie_parser_1.default)(config.cookieSecret));
        this.set("Session", new Session_1.Session());
        this.set("Authenticator", new Authenticator_1.Authenticator(this));
        this.set("config", config);
        const langFIle = fs_1.default.readFileSync("./locales/language.json");
        this.lang = JSON.parse(langFIle);
        this.use(new Extention_1.Extention());
        this.use(this.Session);
        this.use(this.Authenticator);
    }
    registerAction(context, method, route, callback, roles) {
        if (!roles)
            roles = [];
        const wrappedCb = this.execute(context, callback, roles);
        switch (method) {
            case Action_1.HttpMethods.GET:
                this.Express.get(route, wrappedCb);
                break;
            case Action_1.HttpMethods.POST:
                this.Express.post(route, wrappedCb);
                break;
            case Action_1.HttpMethods.PUT:
                this.Express.put(route, wrappedCb);
                break;
            case Action_1.HttpMethods.PATCH:
                this.Express.patch(route, wrappedCb);
                break;
            case Action_1.HttpMethods.DELETE:
                this.Express.delete(route, wrappedCb);
                break;
        }
    }
    registerController(ControllerClass) {
        const controller = new ControllerClass();
        controller.Register(this);
        this.Controllers.push(controller);
    }
    execute(context, callback, roles) {
        return (req, resp, next) => {
            if (roles.length > 0 && (!req.user || roles.indexOf(req.user.role) === -1)) {
                resp.redirect(`/login?ref=${encodeURIComponent(req.path)}`);
            }
            else {
                this.populateBag(req, resp);
                callback.call(context, req, resp, next);
            }
        };
    }
    populateBag(req, resp) {
        if (!resp.bag.menu)
            resp.bag.menu = { main: { items: [] } };
        for (const key of this.menus.Keys()) {
            const menu = { items: this.menus.Item(key).items.filter(mi => mi.for.length === 0 || (req.user && mi.for.indexOf(req.user.role) >= 0)) };
            resp.bag.menu[key] = menu;
        }
        resp.bag.fmt = {};
        for (const key of this.formatters.Keys()) {
            resp.bag.fmt[key] = this.formatters.Item(key);
        }
        resp.bag.user = req.user;
        if (req.cookies.AppLanguage === 'bn') {
            resp.bag.lang = this.lang.bn;
            resp.bag.switchLangBtn = { text: "English", url: "/en" };
        }
        else if (req.cookies.AppLanguage === 'en') {
            resp.bag.lang = this.lang.en;
            resp.bag.switchLangBtn = { text: "বাংলা", url: "/bn" };
        }
        else {
            resp.bag.lang = this.lang.en;
            resp.bag.switchLangBtn = { text: "বাংলা", url: "/bn" };
        }
    }
    setFormatter(name, value) {
        this.formatters.Add(name, value);
    }
    use(middleware) {
        this.Express.use((req, resp, next) => {
            middleware.process(req, resp, next);
        });
    }
    setStatic(root, options) {
        this.Express.use(express_1.default.static(root, options));
    }
    viewDir(root) {
        this.Express.set("views", root);
    }
    viewEngine(name) {
        this.Express.set("view engine", name);
    }
    setMenu(name, menu) {
        this.menus.Add(name, menu);
    }
    getMenu(name) {
        return this.menus.Item(name);
    }
    set(name, value) {
        this.services.Add(name, value);
        Object.defineProperty(this, name, {
            get() {
                return value;
            }
        });
        for (const controller of this.Controllers) {
            Object.defineProperty(controller, name, {
                get() {
                    return value;
                }
            });
        }
    }
    get(name) {
        if (this.services.ContainsKey(name)) {
            return this.services.Item(name);
        }
    }
    getServiceNames() {
        return this.services.Keys();
    }
    listen(port, callback) {
        this.Express.listen(port, callback);
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map