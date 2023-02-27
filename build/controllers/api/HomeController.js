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
exports.HomeController = void 0;
const Controller_1 = require("../../core/Controller");
const IUserProvider_1 = require("../../core/IUserProvider");
const fs_extra_1 = __importDefault(require("fs-extra"));
const multiparty_1 = __importDefault(require("multiparty"));
class HomeController extends Controller_1.Controller {
    onRegister() {
        this.onPost("/btrac-technology/api/v1/home/slider/create", this.createSlider, [IUserProvider_1.Role.Admin]);
        this.onGet("/btrac-technology/api/v1/home/slider", this.getAllSlider);
    }
    createSlider(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const localPath = `./build/public/uploads/images/`;
            if (!fs_extra_1.default.existsSync(localPath)) {
                fs_extra_1.default.mkdirSync(localPath);
            }
            const form = new multiparty_1.default.Form();
            const timeNow = new Date().getTime();
            try {
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    const newFilePath = localPath + timeNow;
                    const { title, description } = fields;
                    if (!(files === null || files === void 0 ? void 0 : files.image) || !(fields === null || fields === void 0 ? void 0 : fields.title) || !(fields === null || fields === void 0 ? void 0 : fields.description))
                        return resp.send({ status: 200, error: true, message: "missing required fields!.", action: "", data: {} });
                    const currentPath = newFilePath + files.image[0].originalFilename;
                    const fileName = timeNow + files.image[0].originalFilename;
                    yield fs_extra_1.default.move(files.image[0].path, currentPath);
                    yield this.HomeProvider.createSlider(title[0], description[0], fileName).then((slider) => __awaiter(this, void 0, void 0, function* () {
                        slider.isActive = true;
                        slider.save();
                        return resp.send({ status: 201, error: false, message: "home slider created successfully!.", action: "", data: {} });
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        return resp.send({ status: 400, error: true, message: error, action: "", data: {} });
                    }));
                }));
            }
            catch (err) {
                return resp.send({ status: 200, error: true, message: err, action: "try later", data: null });
            }
        });
    }
    getAllSlider(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const hostAddress = req.headers.host + '/uploads/images/';
            yield this.HomeProvider.getAllSlider().then((sliderPage) => __awaiter(this, void 0, void 0, function* () {
                if (sliderPage.length <= 0)
                    return resp.send({ status: 404, error: true, message: 'no data found', action: "", data: null });
                return resp.send({ status: 200, error: false, message: 'all sliders data', action: "", data: { sliders: sliderPage, hostAddress } });
            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                return resp.send({ status: 404, error: true, message: error, action: "", data: {} });
            }));
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map