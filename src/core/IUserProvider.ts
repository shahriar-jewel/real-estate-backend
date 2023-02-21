import { Document } from "mongoose";

export enum Role {
    Admin = "Admin",
    Agent = "Agent",
    Customer = "Customer"
}

export interface EmbededUser {
    id: string,
    fullName: string,
}

export interface EmbeddedBusinessInfo {
    companyId: string,
    companyName: string,
}

export interface EmbeddedStore {
    id: string,
    storeName: string,
}


export interface IUser extends Document {
    fullName: string,
    username: string,
    password: string,
    avatar: string,
    role: Role,
    businessInfo: EmbeddedBusinessInfo,
    stores: EmbeddedStore[],
    isActive: boolean,
}

export interface ISession extends Document {
    username: string,
    refreshToken: string,
}

export interface IUserToken {
    id: string,
    name: string,
    username: string,
    role: Role,
    signedAt: Date,
    remember: boolean,
    check: string
}


export interface IUserPage {
    size: number,
    page: number,
    count: number,
    data: IUser[]
}


export interface IUserProvider {


    count(): Promise<number>;

    /**
     * Get an user by phone number
     * @param phone to look for
     */

    get(username: string): Promise<IUser>;

    getAll(page:number, size:number): Promise<IUserPage>;

    /**
     * To create an new user
     * @param username to create for
     * @param role to create for
     * @param businessInfo to create for
     */
    create(fullName: string, username: string, userPassword: string, role: Role, businessInfo?: EmbeddedBusinessInfo ): Promise<IUser>;

    /**
     *
     * @param id of user
     */
    getById(id: string): Promise<IUser>

    /**
     * To create an user session by phone number
     * @param username to create for
     * @param refreshToken to create for
     */
    createSession(username: string, refreshToken: string ): Promise<ISession>;
    checkSession(refreshToken: string): Promise<ISession>;


}