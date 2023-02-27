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
exports.PropertyController = void 0;
const Controller_1 = require("../core/Controller");
const IUserProvider_1 = require("../core/IUserProvider");
const fs_extra_1 = __importDefault(require("fs-extra"));
const multiparty_1 = __importDefault(require("multiparty"));
class PropertyController extends Controller_1.Controller {
    onRegister() {
        this.onPost("/real-estate/web/v1/property/create", this.createProperty, [IUserProvider_1.Role.Admin]);
        this.onGet("/real-estate/api/v1/property", this.getAllProperty);
    }
    createProperty(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const localPath = `./build/public/uploads/images/`;
            if (!fs_extra_1.default.existsSync(localPath)) {
                fs_extra_1.default.mkdirSync(localPath);
            }
            const form = new multiparty_1.default.Form();
            let timeNow;
            let propertyData;
            let newFilePath;
            let currentPath;
            let fileName;
            let imageUrl;
            const imageUrls = [];
            try {
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    if (err)
                        return resp.send({ status: 201, error: false, message: err, action: "", data: {} });
                    timeNow = new Date().getTime();
                    newFilePath = localPath + timeNow;
                    currentPath = newFilePath + ((_a = files === null || files === void 0 ? void 0 : files.imageUrl[0]) === null || _a === void 0 ? void 0 : _a.originalFilename);
                    imageUrl = timeNow + '/' + ((_b = files === null || files === void 0 ? void 0 : files.imageUrl[0]) === null || _b === void 0 ? void 0 : _b.originalFilename);
                    yield fs_extra_1.default.move((_c = files === null || files === void 0 ? void 0 : files.imageUrl[0]) === null || _c === void 0 ? void 0 : _c.path, currentPath);
                    for (const image of files === null || files === void 0 ? void 0 : files.imageUrls) {
                        timeNow = new Date().getTime();
                        newFilePath = localPath + timeNow;
                        currentPath = newFilePath + (image === null || image === void 0 ? void 0 : image.originalFilename);
                        fileName = timeNow + '/' + (image === null || image === void 0 ? void 0 : image.originalFilename);
                        imageUrls.push(fileName);
                        yield fs_extra_1.default.move(image === null || image === void 0 ? void 0 : image.path, currentPath);
                    }
                    const path = ['/' + (fields === null || fields === void 0 ? void 0 : fields.city[0]), fields === null || fields === void 0 ? void 0 : fields.province[0], 'real estate/', fields === null || fields === void 0 ? void 0 : fields.unitNumber[0], fields === null || fields === void 0 ? void 0 : fields.streetNumber[0], fields === null || fields === void 0 ? void 0 : fields.streetName[0], fields === null || fields === void 0 ? void 0 : fields.city[0], fields === null || fields === void 0 ? void 0 : fields.province[0], fields === null || fields === void 0 ? void 0 : fields.postalCode[0], fields === null || fields === void 0 ? void 0 : fields.mlsNum[0]
                    ];
                    const addressPath = [fields === null || fields === void 0 ? void 0 : fields.city[0], fields === null || fields === void 0 ? void 0 : fields.province[0], 'real estate/', fields === null || fields === void 0 ? void 0 : fields.neighbourhoodName[0], fields === null || fields === void 0 ? void 0 : fields.unitNumber[0], fields === null || fields === void 0 ? void 0 : fields.streetNumber[0], fields === null || fields === void 0 ? void 0 : fields.streetName[0]];
                    propertyData = {
                        price: fields === null || fields === void 0 ? void 0 : fields.price[0],
                        soldPrice: fields === null || fields === void 0 ? void 0 : fields.soldPrice[0],
                        bedrooms: fields === null || fields === void 0 ? void 0 : fields.bedrooms[0],
                        bedroomsPartial: fields === null || fields === void 0 ? void 0 : fields.bedroomsPartial[0],
                        bathrooms: fields === null || fields === void 0 ? void 0 : fields.bathrooms[0],
                        bathroomsPartial: fields === null || fields === void 0 ? void 0 : fields.bathroomsPartial[0],
                        squareFootage: { min: fields === null || fields === void 0 ? void 0 : fields.min[0], max: fields === null || fields === void 0 ? void 0 : fields.max[0] },
                        isVow: fields === null || fields === void 0 ? void 0 : fields.isVow[0],
                        isCrea: fields === null || fields === void 0 ? void 0 : fields.isCrea[0],
                        isItsoVow: fields === null || fields === void 0 ? void 0 : fields.isItsoVow[0],
                        isRental: fields === null || fields === void 0 ? void 0 : fields.isRental[0],
                        unitNumber: fields === null || fields === void 0 ? void 0 : fields.unitNumber[0],
                        streetNumber: fields === null || fields === void 0 ? void 0 : fields.streetNumber[0],
                        streetName: fields === null || fields === void 0 ? void 0 : fields.streetName[0],
                        neighbourhoodName: fields === null || fields === void 0 ? void 0 : fields.neighbourhoodName[0],
                        city: fields === null || fields === void 0 ? void 0 : fields.city[0],
                        imageUrl,
                        thumbnailUrl: imageUrl,
                        imageDesc: fields === null || fields === void 0 ? void 0 : fields.imageDesc[0],
                        addedAt: fields === null || fields === void 0 ? void 0 : fields.addedAt[0],
                        expiredAt: fields === null || fields === void 0 ? void 0 : fields.expiredAt[0],
                        soldAt: fields === null || fields === void 0 ? void 0 : fields.soldAt[0],
                        path: this.convertToSlug(path),
                        province: fields === null || fields === void 0 ? void 0 : fields.province[0],
                        addressPath: this.convertToSlug(addressPath),
                        status: fields === null || fields === void 0 ? void 0 : fields.status[0],
                        lastStatus: fields === null || fields === void 0 ? void 0 : fields.lastStatus[0],
                        isImageReady: fields === null || fields === void 0 ? void 0 : fields.isImageReady[0],
                        position: {
                            type: 'Point',
                            coordinates: [fields === null || fields === void 0 ? void 0 : fields.lat[0], fields === null || fields === void 0 ? void 0 : fields.lng[0]]
                        },
                        neighbourhood: fields === null || fields === void 0 ? void 0 : fields.neighbourhood[0],
                        addressSlug: this.convertToSlug(addressPath),
                        availableAt: fields === null || fields === void 0 ? void 0 : fields.availableAt[0],
                        mlsNum: fields === null || fields === void 0 ? void 0 : fields.mlsNum[0],
                        postalCode: fields === null || fields === void 0 ? void 0 : fields.postalCode[0],
                        imageUrls,
                        thumbnailUrls: [],
                        misc: fields === null || fields === void 0 ? void 0 : fields.misc[0],
                        virtualTourUrl: fields === null || fields === void 0 ? void 0 : fields.virtualTourUrl[0],
                        description: fields === null || fields === void 0 ? void 0 : fields.description[0],
                        brokerage: fields === null || fields === void 0 ? void 0 : fields.brokerage[0],
                        disclaimer: fields === null || fields === void 0 ? void 0 : fields.disclaimer[0],
                        type: fields === null || fields === void 0 ? void 0 : fields.type[0],
                        levels: fields === null || fields === void 0 ? void 0 : fields.levels[0],
                        locker: fields === null || fields === void 0 ? void 0 : fields.locker[0],
                        parking: fields === null || fields === void 0 ? void 0 : fields.parking[0],
                        maintenanceFees: fields === null || fields === void 0 ? void 0 : fields.maintenanceFees[0],
                        taxes: fields === null || fields === void 0 ? void 0 : fields.taxes[0],
                        exterior: fields === null || fields === void 0 ? void 0 : fields.exterior[0],
                        basement: fields === null || fields === void 0 ? void 0 : fields.basement[0],
                        garage: fields === null || fields === void 0 ? void 0 : fields.garage[0],
                        driveway: fields === null || fields === void 0 ? void 0 : fields.driveway[0],
                        pool: fields === null || fields === void 0 ? void 0 : fields.pool[0],
                        heat: fields === null || fields === void 0 ? void 0 : fields.heat[0],
                        ac: fields === null || fields === void 0 ? void 0 : fields.ac[0],
                        heatingFuel: fields === null || fields === void 0 ? void 0 : fields.heatingFuel[0],
                        rooms: [{
                                type: '',
                                level: '',
                                width: '',
                                length: '',
                                unit: ''
                            }],
                        extras: fields === null || fields === void 0 ? void 0 : fields.extras[0],
                        openHouses: fields === null || fields === void 0 ? void 0 : fields.openHouses[0],
                        lotFrontage: fields === null || fields === void 0 ? void 0 : fields.lotFrontage[0],
                        lotDepth: fields === null || fields === void 0 ? void 0 : fields.lotDepth[0],
                        style: fields === null || fields === void 0 ? void 0 : fields.style[0],
                        styleName: fields === null || fields === void 0 ? void 0 : fields.styleName[0],
                        url: fields === null || fields === void 0 ? void 0 : fields.url[0],
                        providerId: fields === null || fields === void 0 ? void 0 : fields.providerId[0],
                        termsOfUseRequired: fields === null || fields === void 0 ? void 0 : fields.termsOfUseRequired[0]
                    };
                    yield this.PropertyProvider.create(propertyData).then((property) => __awaiter(this, void 0, void 0, function* () {
                        property.save();
                        return resp.send({ status: 200, error: false, message: "property created successfully!.", action: "", data: {} });
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        return resp.send({ status: 200, error: true, message: error, action: "", data: {} });
                    }));
                }));
            }
            catch (err) {
                return resp.send({ status: 200, error: true, message: err, action: "try later", data: null });
            }
        });
    }
    getAllProperty(req, resp, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.page);
            if (!page || page < 1)
                page = 1;
            const pageSize = Number(req.query.pageSize ? req.query.pageSize : 6);
            const searchStr = String(req.query.searchStr ? req.query.searchStr : '');
            const hostAddress = req.headers.host + '/uploads/images/';
            yield this.PropertyProvider.getAll(page, pageSize, searchStr).then((propertyPage) => __awaiter(this, void 0, void 0, function* () {
                if (propertyPage.properties.length <= 0)
                    return resp.send({ status: 404, error: true, message: 'no data found', action: "", data: null });
                return resp.send({ status: 200, error: false, message: 'all properties data', action: "", data: propertyPage, hostAddress });
            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                return resp.send({ status: 404, error: true, message: error, action: "", data: {} });
            }));
        });
    }
    convertToSlug(obj) {
        let str = obj.filter((e) => e.length > 0).join('-');
        str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
        str = str.replace(/^\s+|\s+$/gm, '');
        str = str.replace(/\s+/g, '-');
        return str;
    }
}
exports.PropertyController = PropertyController;
//# sourceMappingURL=PropertyController.js.map