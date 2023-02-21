import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import { Role } from "../core/IUserProvider";
import { IUserProvider } from "../core/IUserProvider";
import fs from "fs-extra";
import moveFile from "move-file";
import multiparty from "multiparty";
import { IPropertyProvider } from "../core/IPropertyProvider";

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
        const timeNow = new Date().getTime();
        try {
            form.parse(req, async (err, fields, files) => {
                const newFilePath = localPath + timeNow;
                const { title, description } = fields;
                if (!files?.image || !fields?.title || !fields?.description) return resp.send({ status: 200, error: true, message: "missing required fields!.", action: "", data: {} });
                const currentPath = newFilePath + files.image[0].originalFilename;
                const fileName = timeNow + files.image[0].originalFilename;
                await fs.move(files.image[0].path, currentPath);
                await this.PropertyProvider.createProperty(title[0], description[0], fileName).then(async slider => {
                    slider.save();
                    return resp.send({ status: 201, error: false, message: "home slider created successfully!.", action: "", data: {} });
                }).catch(async error => {
                    return resp.send({ status: 400, error: true, message: error, action: "", data: {} });
                });
            });
        } catch (err) {
            return resp.send({ status: 200, error: true, message: err, action: "try later", data: null });
        }
        /* tslint:enable:no-bitwise */
    }
    public async getAllProperty(req: HttpRequest, resp: HttpResponse, next: NextFunc) {
        const hostAddress: string = req.headers.host+'/uploads/images/';
        await this.PropertyProvider.getAllProperty().then(async sliderPage => {
            if (sliderPage.length <= 0) return resp.send({ status: 404, error: true, message: 'no data found', action: "", data: null });
            return resp.send({ status: 200, error: false, message: 'all sliders data', action: "", data: { sliders: sliderPage, hostAddress } });
        }).catch(async error => {
            return resp.send({ status: 404, error: true, message: error, action: "", data: {} });
        });
    }

}