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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const Controller_1 = require("../core/Controller");
const IUserProvider_1 = require("../core/IUserProvider");
class DashboardController extends Controller_1.Controller {
    onRegister() {
        this.onGet("/", this.index, [IUserProvider_1.Role.Admin]);
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.bag.pageTitle = "real estate solution | Dashboard";
            const stats = [];
            stats.total_sessions = 1;
            stats.today_sessions = 2;
            stats.total_users = 3;
            res.bag.stats = stats;
            res.view('dashboard/admin');
        });
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=DashboardController.js.map