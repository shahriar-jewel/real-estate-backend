"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const Controller_1 = require("../core/Controller");
class LoginController extends Controller_1.Controller {
    onRegister() {
        this.onGet("/login", this.loginView);
        this.onPost("/login", this.loginCheck);
        this.onGet("/logout", this.logout);
    }
    loginView(req, res, next) {
        res.bag.pageTitle = "real estate solution | Login";
        res.view("login");
    }
    loginCheck(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const remember = !!req.body.remember;
        const ref = typeof req.query.ref !== "undefined" ? req.query.ref : '/';
        this.Authenticator.authenticate(username, password, remember).then(token => {
            if (token(req, res)) {
                res.redirect(ref);
            }
            else {
                res.bag.errorMessage = "Invalid username or password";
                res.view("login");
            }
        }).catch(err => {
            res.bag.errorMessage = "Please try later.";
            res.view("login");
        });
    }
    ;
    logout(req, res, next) {
        res.clearCookie(this.Authenticator.AUTH_COOKIE_NAME);
        res.redirect("/");
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map