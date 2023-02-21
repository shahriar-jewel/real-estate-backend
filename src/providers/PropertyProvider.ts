import PropertyModel from "../models/PropertyModel";
import { IProperty, IPropertyProvider } from "../core/IPropertyProvider";


export class PropertyProvider implements IPropertyProvider {

    public async createProperty(title: string, description: string, image: string): Promise<IProperty> {
        return await PropertyModel.create({
            title,
            description,
            image
        });
    }
    public async getAllProperty(): Promise<IProperty[]> {
        return await PropertyModel.find({isActive : true});
    }
}