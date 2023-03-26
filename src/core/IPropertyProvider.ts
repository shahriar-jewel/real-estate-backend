import { Document } from "mongoose";

export interface SquareFootage {
    min: number,
    max: number
}
export interface Position {
    type: string,
    coordinates: []
}
export interface Room {
    type: string,
    level: string,
    width: string,
    length: string,
    unit: string
}
export interface IProperty extends Document {
    price: number,
    soldPrice: number,
    bedrooms: number,
    bedroomsPartial: number,
    bathrooms: number,
    bathroomsPartial: number,
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
    parking: string,
    maintenanceFees: string,
    taxes: string,
    exterior: string,
    basement: string,
    garage: string,
    driveway: string,
    pool: boolean,
    heat: string,
    ac: string,
    heatingFuel: string,
    rooms: Room[],
    extras: string,
    openHouses: string,
    lotFrontage: string,
    lotDepth: string,
    style: string,
    styleName: string,
    url: string,
    providerId: string,
    termsOfUseRequired: string,
    listingType: string,
    listingStatus: string
}
export interface IPropertyPage {
    properties: IProperty[],
    size: number,
    page: number,
    lastPage: number,
    count: number
}
export interface IPropertyProvider {
    /**
     * Get property data
     */
    getAll(page: number, size: number, queryFilter?: {}, listingType?: string, listingStatus? : string, priceFilter? : {}): Promise<IPropertyPage>;
    /**
     * To create a slider
     * @param page to create for
     * @param size to create for
     * @param queryFilter to create for
     * @param listingType to create for
     */
    create(propertyData: object): Promise<IProperty>;
}