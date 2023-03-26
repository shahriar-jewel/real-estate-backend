import PropertyModel from "../models/PropertyModel";
import { IProperty, IPropertyPage, IPropertyProvider } from "../core/IPropertyProvider";


export class PropertyProvider implements IPropertyProvider {

    public async create(propertyData: object): Promise<IProperty> {
        return await PropertyModel.create({ ...propertyData });
    }
    public async getAll(page: number = 1, size: number = 6, queryFilter?: {}, listingType?: string, listingStatus? : string, priceFilter?: {}): Promise<IPropertyPage> {

        const count = await PropertyModel.countDocuments({...queryFilter, listingType, listingStatus, ...priceFilter});
        const lastPage = Math.ceil(count / size);
        return {
            properties: await PropertyModel.find({...queryFilter, listingType, listingStatus, ...priceFilter}).skip(size * (page - 1)).limit(size).sort({createdAt: -1}),
            size,
            page,
            lastPage,
            count
        };
    }
}