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
exports.WeightDataProvider = void 0;
const WeightDataModel_1 = __importDefault(require("../models/WeightDataModel"));
class WeightDataProvider {
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.find().find().countDocuments();
        });
    }
    todayCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.find({ createdAt: { $gte: new Date().setUTCHours(0, 0, 0, 0), $lt: new Date().setUTCHours(23, 59, 59, 999) } }).countDocuments();
        });
    }
    getAll(stationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.find({ "stationId": stationId }, { '__v': 0 }).catch(err => null);
        });
    }
    weightDataReport(page = 1, size = 20, stationId, vehicleNo, vendorId, challanNo, productId, fromDate, toDate, storeList) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (stationId) {
                filter = Object.assign(Object.assign({}, filter), { stationId });
            }
            if (vehicleNo) {
                filter = Object.assign(Object.assign({}, filter), { vehicleNo: { $regex: vehicleNo, $options: 'i' } });
            }
            if (vendorId) {
                if (typeof (vendorId) === 'object') {
                    filter = Object.assign(Object.assign({}, filter), { "weightData.challan.party.id": { $in: vendorId } });
                }
                else {
                    filter = Object.assign(Object.assign({}, filter), { "weightData.challan.party.id": { $regex: vendorId, $options: 'i' } });
                }
            }
            if (challanNo) {
                filter = Object.assign(Object.assign({}, filter), { "weightData.challan.challanNo": { $regex: challanNo, $options: 'i' } });
            }
            if (productId) {
                filter = Object.assign(Object.assign({}, filter), { "weightData.challan.products.id": { $regex: productId, $options: 'i' } });
            }
            if (storeList !== null) {
                filter = Object.assign(Object.assign({}, filter), { weightData: { $elemMatch: { 'challan.section': storeList } } });
            }
            if (fromDate && toDate) {
                filter = Object.assign(Object.assign({}, filter), { 'weightData.time': { $gte: fromDate, $lte: toDate } });
            }
            let pageSize;
            let query;
            const count = yield WeightDataModel_1.default.find(filter).countDocuments();
            if (page === 0) {
                pageSize = count;
                query = yield WeightDataModel_1.default.find(filter).sort({ serialNo: -1 }).catch(err => null);
            }
            else {
                pageSize = size;
                query = yield WeightDataModel_1.default.find(filter).sort({ serialNo: -1 }).skip(size * (page - 1)).limit(size).catch(err => null);
            }
            return { size: pageSize, page, count, data: query };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.findOne({ "_id": id }, { '__v': 0 }).catch(err => null);
        });
    }
    getLastItem(stationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.findOne({ "stationId": stationId }, { '__v': 0 }).sort('-updatedAt').catch(err => null);
        });
    }
    create(serialNo, vehicleNo, driverName, stationId, weightData, flag = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExists = yield WeightDataModel_1.default.findOne({ "serialNo": serialNo }, { '__v': 0 }).sort('-updatedAt').catch(err => null);
            if (isExists) {
                const updateData = { "serialNo": serialNo, "vehicleNo": vehicleNo, "stationId": stationId, "driverName": driverName, "weightData": weightData, flag };
                const tt = yield WeightDataModel_1.default.updateOne({ "serialNo": serialNo }, updateData);
                return isExists;
            }
            else {
                return yield WeightDataModel_1.default.create({
                    serialNo,
                    vehicleNo,
                    driverName,
                    stationId,
                    weightData,
                    flag
                });
            }
        });
    }
    update(id, serialNo, vehicleNo, stationId, driverName, weightData, flag = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { "serialNo": serialNo, "vehicleNo": vehicleNo, "stationId": stationId, "driverName": driverName, "weightData": weightData, flag };
            return yield WeightDataModel_1.default.updateOne({ "_id": id }, updateData);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.findByIdAndDelete(id);
        });
    }
    updateRefVendor(vendorId, vendorName, vendorAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WeightDataModel_1.default.updateMany({
                "weightData.challan.party.id": vendorId
            }, {
                "$set": {
                    "weightData.$[wd].challan.party.name": vendorName,
                    "weightData.$[wd].challan.party.address": vendorAddress
                }
            }, { arrayFilters: [{ "wd.challan.party.id": vendorId }] });
        });
    }
}
exports.WeightDataProvider = WeightDataProvider;
//# sourceMappingURL=WeightDataProvider.js.map