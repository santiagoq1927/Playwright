import { LoginPageData } from "./LoginPageData";

export interface User{
    username: string;
    password: string;
}

const loginData = new LoginPageData();
export const standartUser: User = {
    username: loginData.credentials.username.standartUser,
    password: loginData.credentials.password.passwordUser   
}

export const invalidUser: User = {
    username: loginData.credentials.username.standartUser,
    password: loginData.credentials.passwordInvalid.passwordUser   
}