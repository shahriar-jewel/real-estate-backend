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
exports.SMTPMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SMTPMailer {
    constructor(smtp) {
        this.smtp = smtp;
        this.mailer = nodemailer_1.default.createTransport(smtp);
    }
    send(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mail.from)
                mail.from = this.smtp.from;
            try {
                const info = yield this.mailer.sendMail(mail);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.SMTPMailer = SMTPMailer;
//# sourceMappingURL=SMTPMailer.js.map