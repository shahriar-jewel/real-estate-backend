import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import { Role } from "../core/IUserProvider";
import { IUserProvider } from "../core/IUserProvider";


export class DashboardController extends Controller {

    private UserProvider: IUserProvider;

    public onRegister(): void {
        this.onGet("/", this.index, [Role.Admin]);
    }

    /**
     * Shall provide the dashboard interface with stats data
     */
    public async index(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        res.bag.pageTitle = "b-Trac Technology | Dashboard"
        const stats: any = [];

        stats.total_sessions = 1;
        stats.today_sessions = 2;
        stats.total_users = 3;

        res.bag.stats = stats;
        res.view('dashboard/admin');
    }





}