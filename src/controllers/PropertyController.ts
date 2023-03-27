import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import { Role } from "../core/IUserProvider";
import { IUserProvider } from "../core/IUserProvider";
import fs from "fs-extra";
import moveFile from "move-file";
import multiparty from "multiparty";
import { IProperty, IPropertyProvider, SquareFootage, Position } from "../core/IPropertyProvider";
import PropertyModel from "../models/PropertyModel";

export class PropertyController extends Controller {

    private PropertyProvider: IPropertyProvider;

    public onRegister(): void {
        this.onPost("/real-estate/web/v1/property/create", this.createProperty, [Role.Admin]);
        this.onGet("/real-estate/api/v1/property", this.getAllProperty);
    }
    /**
     * Shall provide the dashboard interface with stats data
     */
    public async createProperty(req: HttpRequest, resp: HttpResponse, next: NextFunc) {
        /* tslint:disable:no-bitwise */
        const localPath = `./build/public/uploads/images/`;
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath);
        }
        const form = new multiparty.Form();
        let timeNow;
        let propertyData: any;
        let newFilePath;
        let currentPath;
        let fileName;
        let imageUrl;
        const imageUrls: any[] = [];
        try {
            form.parse(req, async (err, fields, files) => {
                if (err) return resp.send({ status: 201, error: false, message: err, action: "", data: {} });

                timeNow = new Date().getTime();
                newFilePath = localPath + timeNow;
                currentPath = newFilePath + files?.imageUrl[0]?.originalFilename;
                imageUrl = timeNow + files?.imageUrl[0]?.originalFilename;
                await fs.move(files?.imageUrl[0]?.path, currentPath);

                for (const image of files?.imageUrls) {
                    timeNow = new Date().getTime();
                    newFilePath = localPath + timeNow;
                    currentPath = newFilePath + image?.originalFilename;
                    fileName = timeNow + image?.originalFilename;
                    imageUrls.push(fileName);
                    await fs.move(image?.path, currentPath);
                }

                const path: string[] = ['/' + fields?.city[0], fields?.province[0], 'real estate/', fields?.unitNumber[0], fields?.streetNumber[0],
                fields?.streetName[0], fields?.city[0], fields?.province[0], fields?.postalCode[0], fields?.mlsNum[0]
                ];

                const addressPath: string[] = [fields?.city[0], fields?.province[0], 'real estate/', fields?.neighbourhoodName[0],
                fields?.unitNumber[0], fields?.streetNumber[0], fields?.streetName[0]];

                propertyData = {
                    price: fields?.price[0],
                    soldPrice: fields?.soldPrice[0],
                    bedrooms: fields?.bedrooms[0],
                    bedroomsPartial: fields?.bedroomsPartial[0],
                    bathrooms: fields?.bathrooms[0],
                    bathroomsPartial: fields?.bathroomsPartial[0],
                    squareFootage: { min: fields?.min[0], max: fields?.max[0] },
                    isVow: fields?.isVow[0],
                    isCrea: fields?.isCrea[0],
                    isItsoVow: fields?.isItsoVow[0],
                    isRental: fields?.isRental[0],
                    unitNumber: fields?.unitNumber[0],
                    streetNumber: fields?.streetNumber[0],
                    streetName: fields?.streetName[0],
                    neighbourhoodName: fields?.neighbourhoodName[0],
                    city: fields?.city[0],
                    imageUrl,
                    thumbnailUrl: imageUrl,
                    imageDesc: fields?.imageDesc[0],
                    addedAt: fields?.addedAt[0],
                    expiredAt: fields?.expiredAt[0],
                    soldAt: fields?.soldAt[0],
                    path: this.convertToSlug(path),
                    province: fields?.province[0],
                    addressPath: this.convertToSlug(addressPath),
                    status: fields?.status[0],
                    lastStatus: fields?.lastStatus[0],
                    isImageReady: fields?.isImageReady[0],
                    position: {
                        type: 'Point',
                        coordinates: [fields?.lat[0], fields?.lng[0]]
                    },
                    neighbourhood: fields?.neighbourhood[0],
                    addressSlug: this.convertToSlug(addressPath),
                    availableAt: fields?.availableAt[0],
                    mlsNum: fields?.mlsNum[0],
                    postalCode: fields?.postalCode[0],
                    imageUrls,
                    thumbnailUrls: [],
                    misc: fields?.misc[0],
                    virtualTourUrl: fields?.virtualTourUrl[0],
                    description: fields?.description[0],
                    brokerage: fields?.brokerage[0],
                    disclaimer: fields?.disclaimer[0],
                    type: fields?.type[0],
                    levels: fields?.levels[0],
                    locker: fields?.locker[0],
                    parking: fields?.parking[0],
                    maintenanceFees: fields?.maintenanceFees[0],
                    taxes: fields?.taxes[0],
                    exterior: fields?.exterior[0],
                    basement: fields?.basement[0],
                    garage: fields?.garage[0],
                    driveway: fields?.driveway[0],
                    pool: fields?.pool[0],
                    heat: fields?.heat[0],
                    ac: fields?.ac[0],
                    heatingFuel: fields?.heatingFuel[0],
                    rooms: [{
                        type: '',
                        level: '',
                        width: '',
                        length: '',
                        unit: ''
                    }],
                    extras: fields?.extras[0],
                    openHouses: fields?.openHouses[0],
                    lotFrontage: fields?.lotFrontage[0],
                    lotDepth: fields?.lotDepth[0],
                    style: fields?.style[0],
                    styleName: fields?.styleName[0],
                    url: fields?.url[0],
                    providerId: fields?.providerId[0],
                    termsOfUseRequired: fields?.termsOfUseRequired[0],
                    listingType: fields?.listingType[0],
                    listingStatus: fields?.listingStatus[0],
                };

                await this.PropertyProvider.create(propertyData).then(async property => {
                    property.save();
                    return resp.send({ status: 200, error: false, message: "property created successfully!.", action: "", data: {} });
                }).catch(async error => {
                    return resp.send({ status: 200, error: true, message: error, action: "", data: {} });
                });
            });
        } catch (err) {
            return resp.send({ status: 200, error: true, message: err, action: "try later", data: null });
        }
        /* tslint:enable:no-bitwise */
    }
    public async getAllProperty(req: HttpRequest, resp: HttpResponse, next: NextFunc) {
        // await PropertyModel.updateMany(
        //     {"listingStatus" : {$exists : false}},
        //     {$set : {"listingStatus" : 'active'}}
        // );

        // await PropertyModel.updateMany({},
        //     {$rename : {"listingFor" : 'listingType'}}
        // );

        let page = Number(req.query?.page);
        if (!page || page < 1) page = 1;
        const pageSize = Number(req.query?.pageSize ? req.query.pageSize : 6);


        const searchStr = String(req.query?.searchStr ? req.query.searchStr : '');
        const queryFilter = searchStr && searchStr !== 'all' ? { "$or": [{ "mlsNum": { $regex: searchStr, $options: 'i' } }, { "streetName": { $regex: searchStr, $options: 'i' } }, { "styleName": { $regex: searchStr, $options: 'i' } }, { "city": { $regex: searchStr, $options: 'i' } }] } : '';
        const listingTypeFilter = String(req.query?.listingType || 'sale');
        const listingStatusFilter = String(req.query?.listingStatus || 'active');
        const price : any = req.query?.price || '';
        const priceFilter = price && price !== 'any' ? { price: { $gte: Number(price.split('-')[0]), $lte: Number(price.split('-')[1]), },}: {};

        const hostAddress: string = req.headers.host + '/uploads/images/';
        await this.PropertyProvider.getAll(page, pageSize, queryFilter, listingTypeFilter, listingStatusFilter, priceFilter).then(async propertyPage => {
            if (propertyPage.properties.length <= 0) return resp.send({ status: 404, error: true, message: 'no data found', action: "", data: null });
            return resp.send({ status: 200, error: false, message: 'all properties data', action: "", data: propertyPage, hostAddress });
        }).catch(async error => {
            return resp.send({ status: 404, error: true, message: error, action: "", data: {} });
        });
    }

    private convertToSlug(obj: any): string {
        // filter the empty value before join to ignore empty input
        let str = obj.filter((e: any) => e.length > 0).join('-');

        // replace all special characters | symbols with a space
        str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();

        // trim spaces at start and end of string
        str = str.replace(/^\s+|\s+$/gm, '');

        // replace space with dash/hyphen
        str = str.replace(/\s+/g, '-');
        return str;
    }

}