import PropertyModel from "../models/PropertyModel";
import { IProperty, IPropertyPage, IPropertyProvider } from "../core/IPropertyProvider";


export class PropertyProvider implements IPropertyProvider {

    public async create(propertyData: object): Promise<IProperty> {
        return await PropertyModel.create({ ...propertyData });
    }
    public async getAll(page: number = 1, size: number = 6, searchStr?: string, listingFor?: string): Promise<IPropertyPage> {
        let filter: any;
        // filter = {"$and": [{"listingFor" : listingFor}]};
        if (searchStr) {
            filter = { "$or": [{ "mlsNum": { $regex: searchStr, $options: 'i' } }, { "streetName": { $regex: searchStr, $options: 'i' } }, { "styleName": { $regex: searchStr, $options: 'i' } }] };
        }
        const count = await PropertyModel.countDocuments(filter);
        const lastPage = Math.ceil(count / size);
        return {
            properties: await PropertyModel.find({...filter, listingFor}).skip(size * (page - 1)).limit(size).sort({createdAt: -1}),
            size,
            page,
            lastPage,
            count
        };
    }
}