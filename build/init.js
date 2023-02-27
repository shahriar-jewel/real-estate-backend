"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoInit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const process_1 = require("process");
function mongoInit(url) {
    mongoose_1.default.Promise = bluebird_1.default;
    mongoose_1.default.set("useFindAndModify", false);
    mongoose_1.default.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to mongodb");
    }).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        (0, process_1.exit)();
    });
}
exports.mongoInit = mongoInit;
//# sourceMappingURL=init.js.map