
import { IUserProvider, IUser, ISession, Role, IUserPage, EmbeddedBusinessInfo, EmbededUser } from "../core/IUserProvider";
import UserModel from "../models/UserModel";
import SessionModel from "../models/SessionModel";

export class UserProvider implements IUserProvider {


    public async count(): Promise<number> {
        return await UserModel.find().find().countDocuments();
    }

    public async get(username: string): Promise<IUser> {
        return await UserModel.findOne({ "username": username }).catch(err => null);
    }

    public async getAll(page:number = 1, size:number = 10): Promise<IUserPage> {
        let pageSize : number;
        const count: number = await UserModel.find().countDocuments();
        let query;
        if(page === 0){
            pageSize = count;
            query = await UserModel.find( {} , { password: 0 } ).catch(err => null);
        }else{
            pageSize = size;
            query = await UserModel.find( {} , { password: 0 } ).skip(size * (page - 1)).limit(size).catch(err => null);
        }
        return { size: pageSize, page, count, data: query };
    }

    public async getById(id: string): Promise<IUser> {
        return await UserModel.findById(id, { password: 0 } ).catch(err => null);
    }

    public async create(fullName: string, username: string, password: string, role: Role, businessInfo?: EmbeddedBusinessInfo): Promise<IUser> {
        return await UserModel.create({
            fullName,
            username,
            password,
            avatar: "",
            role: Role.Admin,
            businessInfo,
            stores: null,
            isActive: true
        });
    }


    public async createSession(username: string, refreshToken: string): Promise<any> {
        const session: any = await SessionModel.findOne({ "username": username });
        if (session) {
            return await SessionModel.updateOne({ username }, { refreshToken })
        } else {
            return await SessionModel.create({ username, refreshToken });
        }
    }

    public async checkSession(refreshToken: string): Promise<ISession> {
        return await SessionModel.findOne({ "refreshToken": refreshToken }).catch(err => null);
    }










}