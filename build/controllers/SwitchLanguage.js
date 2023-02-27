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
exports.SwitchLanguage = void 0;
const Controller_1 = require("../core/Controller");
class SwitchLanguage extends Controller_1.Controller {
    onRegister() {
        this.onGet("/en", this.english);
        this.onGet("/bn", this.bangla);
    }
    english(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie('AppLanguage', 'en');
            res.redirect(req.header('Referer') || '/');
        });
    }
    bangla(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie('AppLanguage', 'bn');
            res.redirect(req.header('Referer') || '/');
        });
    }
}
exports.SwitchLanguage = SwitchLanguage;
//# sourceMappingURL=SwitchLanguage.js.map