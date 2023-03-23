import PropertyModel from "../models/PropertyModel";
import { IProperty, IPropertyPage, IPropertyProvider } from "../core/IPropertyProvider";


export class PropertyProvider implements IPropertyProvider {

    public async create(propertyData: object): Promise<IProperty> {
        return await PropertyModel.create({ ...propertyData });
    }
    public async getAll(page: number = 1, size: number = 6, queryFilter?: {}, listingType?: string, listingStatus? : string): Promise<IPropertyPage> {
        
        const count = await PropertyModel.countDocuments({...queryFilter, listingType, listingStatus});
        const lastPage = Math.ceil(count / size);
        return {
            properties: await PropertyModel.find({...queryFilter, listingType, listingStatus}).skip(size * (page - 1)).limit(size).sort({createdAt: -1}),
            size,
            page,
            lastPage,
            count
        };
    }
}