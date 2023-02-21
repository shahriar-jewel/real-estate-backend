import { Document } from "mongoose";

export interface SquareFootage {
    min: string,
    max: string
}
export interface Position {
    type: string,
    coordinates: []
}
export interface IProperty extends Document {
    price: string,
    SoldPrice: string,
    bedrooms: string,
    bedroomsPartial: string,
    bathrooms: string,
    bathroomsPartial: string,
    squareFootage: SquareFootage,
    isVow: boolean,
    isCrea: boolean,
    isItsoVow: boolean,
    isRental: boolean,
    unitNumber: string,
    streetNumber: string,
    streetName: string,
    neighbourhoodName: string,
    city: string,
    imageUrl: string,
    thumbnailUrl: string,
    imageDesc: string,
    addedAt: Date,
    expiredAt: Date,
    soldAt: Date,
    path: string,
    province: string,
    addressPath: string,
    status: string,
    lastStatus: string,
    isImageReady: boolean,
    position: Position,
    neighbourhood: string,
    addressSlug: string,
    availableAt: Date,
    mlsNum: string,
    postalCode: string
    imageUrls: [],
    thumbnailUrls: [],
    misc: string,
    virtualTourUrl: string,
    description: string,
    brokerage: string,
    disclaimer: string,
    type: string,
    levels: string,
    locker: string,
    parking: boolean,
    maintenanceFees: string,
    taxes: string,
    exterior: string,
    basement: string,
    garage: string,
    driveway: string,
    pool: boolean,
    heat: boolean,
    ac: boolean,
    heatingFuel: boolean,
    rooms: string,
    extras: string,
    openHouses: string,
    lotFrontage: string,
    lotDepth: string,
    style: string,
    styleName: string,
    url: string,
    providerId: string,
    termsOfUseRequired: string
}
export interface ISliderPage {
    size: number,
    page: number,
    count: number,
    data: IProperty[]
}
export interface IPropertyProvider {
    /**
     * Get property data
     */
    getAllProperty(): Promise<IProperty[]>;
    /**
     * To create a slider
     * @param title to create for
     * @param description to create for
     * @param image to create for
     */
    createProperty(title: string, description: string, image: string): Promise<IProperty>;
}