
// System
import path from "path";
import fs from "fs";
import { exit } from "process";

// Core
import { mongoInit } from "./init";
import { Application } from "./core/Application";
import { Config } from "./core/Config";
import { Role } from "./core/IUserProvider";
import cron from "node-cron";

// Providers
import { SMTPMailer } from "./providers/SMTPMailer";
import { UserProvider } from "./providers/UserProvider";
import { PropertyProvider } from "./providers/PropertyProvider";

// Formatters
import { dateFormatter } from "./ftms/date";

// Controllers
import { LoginController } from "./controllers/LoginController";
import { DashboardController } from "./controllers/DashboardController";
import { PropertyController } from "./controllers/PropertyController";

// Crons
import { SendReportMail } from "./crons/SendReportMail";

// config
const CONFIG_FILE = "config.json";

if (!fs.existsSync(CONFIG_FILE)) {
    console.warn(`Can't find '${CONFIG_FILE}' please make sure config file is present in the current directory`);
    exit(0);
}

const APP_CONFIG: Config = new Config(JSON.parse(fs.readFileSync(CONFIG_FILE).toString()));

// Initialize mongo db
mongoInit(APP_CONFIG.mongoUrl);

const app = new Application(APP_CONFIG);

app.viewDir("views");
app.viewEngine("pug");
app.setStatic(path.join(__dirname, "public"), { maxAge: 0 }); // 31557600000 turned off caching for now

app.set("UserProvider", new UserProvider());
app.set("HomeProvider", new PropertyProvider());


// Initialize and set the mailer to use
const Mailer = new SMTPMailer(APP_CONFIG.smtp);
app.set("Mailer", Mailer);


// Setup menu
app.setMenu("main", {
    items: [
        { name: "Dashboard", path: "/", for: [Role.Admin] },
        { name: "Report", path: "/report/weight-data", for: [Role.Admin, Role.Agent, Role.Customer] },
        { name: "<i class='large material-icons'>people</i>", path: "/users", for: [Role.Admin] },
        { name: "<i class='large material-icons'>security</i>", path: "/password/change", for: [Role.Admin] },
        { name: "<i class='large material-icons'>exit_to_app</i>", path: "/logout", for: [Role.Admin] }
    ]
})

// Add any formatters, you can access it by fmt.date in views like fmt.date.ymd()
app.setFormatter("date", dateFormatter);

// Lets register the controllers
app.registerController(LoginController);
app.registerController(DashboardController);
app.registerController(PropertyController);



// Finally setup the cron jobs
cron.schedule("1 0 * * *", async () => {
    // await SendReportMail();
});


// start the express server
app.listen(APP_CONFIG.port, () => {
    console.log(`server started at http://localhost:${APP_CONFIG.port}`);
});