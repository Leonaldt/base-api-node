import { UserData } from "../../../entities/user/user-data";
import { RegisterUserResponse } from "../../register-user/register-user-response";

export interface ILoginUser {
    perform (email: string, password: string): Promise<UserData>
}