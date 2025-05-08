import { UserRoleEnum } from "../enums/roles.enum";

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRoleEnum;
}