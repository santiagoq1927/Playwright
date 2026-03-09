import {expect,test} from "@playwright/test";


test("authetication dummy", async ({playwright})=>{
    let apiContext = await playwright.request.newContext({baseURL:'https://dummyjson.com/'});
    const requestBody={
        data:{
            username: 'emilys',
            password: 'emilyspass'
        }
    }

    const authDummy = await apiContext.post('auth/login', requestBody);
    expect(authDummy.ok()).toBeTruthy();
    const body = await authDummy.json();

    expect(body).toHaveProperty("accessToken");
});