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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const init_1 = require("./init");
const Application_1 = require("./core/Application");
const Config_1 = require("./core/Config");
const IUserProvider_1 = require("./core/IUserProvider");
const node_cron_1 = __importDefault(require("node-cron"));
const SMTPMailer_1 = require("./providers/SMTPMailer");
const UserProvider_1 = require("./providers/UserProvider");
const PropertyProvider_1 = require("./providers/PropertyProvider");
const date_1 = require("./ftms/date");
const LoginController_1 = require("./controllers/LoginController");
const DashboardController_1 = require("./controllers/DashboardController");
const PropertyController_1 = require("./controllers/PropertyController");
const CONFIG_FILE = "config.json";
if (!fs_1.default.existsSync(CONFIG_FILE)) {
    console.warn(`Can't find '${CONFIG_FILE}' please make sure config file is present in the current directory`);
    (0, process_1.exit)(0);
}
const APP_CONFIG = new Config_1.Config(JSON.parse(fs_1.default.readFileSync(CONFIG_FILE).toString()));
(0, init_1.mongoInit)(APP_CONFIG.mongoUrl);
const app = new Application_1.Application(APP_CONFIG);
app.viewDir("views");
app.viewEngine("pug");
app.setStatic(path_1.default.join(__dirname, "public"), { maxAge: 0 });
app.set("UserProvider", new UserProvider_1.UserProvider());
app.set("PropertyProvider", new PropertyProvider_1.PropertyProvider());
const Mailer = new SMTPMailer_1.SMTPMailer(APP_CONFIG.smtp);
app.set("Mailer", Mailer);
app.setMenu("main", {
    items: [
        { name: "Dashboard", path: "/", for: [IUserProvider_1.Role.Admin] },
        { name: "Report", path: "/report/weight-data", for: [IUserProvider_1.Role.Admin, IUserProvider_1.Role.Agent, IUserProvider_1.Role.Customer] },
        { name: "<i class='large material-icons'>people</i>", path: "/users", for: [IUserProvider_1.Role.Admin] },
        { name: "<i class='large material-icons'>security</i>", path: "/password/change", for: [IUserProvider_1.Role.Admin] },
        { name: "<i class='large material-icons'>exit_to_app</i>", path: "/logout", for: [IUserProvider_1.Role.Admin] }
    ]
});
app.setFormatter("date", date_1.dateFormatter);
app.registerController(LoginController_1.LoginController);
app.registerController(DashboardController_1.DashboardController);
app.registerController(PropertyController_1.PropertyController);
node_cron_1.default.schedule("1 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(APP_CONFIG.port, () => {
    console.log(`server started at http://localhost:${APP_CONFIG.port}`);
});
//# sourceMappingURL=app.js.map