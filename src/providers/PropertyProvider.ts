import PropertyModel from "../models/PropertyModel";
import { IProperty, IPropertyProvider } from "../core/IPropertyProvider";


export class PropertyProvider implements IPropertyProvider {

    public async create(propertyData: object): Promise<IProperty> {
        return await PropertyModel.create({
            ...propertyData
        });
    }
    public async getAll(): Promise<IProperty[]> {
        return await PropertyModel.find({ isActive: true });
    }
}