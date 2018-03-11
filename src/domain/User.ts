import { AuthToken } from "./AuthToken";

export interface User {

    login: string;
    password: string;
    roles: [string];

}