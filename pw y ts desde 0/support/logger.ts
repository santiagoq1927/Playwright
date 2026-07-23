import {step} from 'allure-js-commons';

export class Logger{
    static async logStep(description:string){
        await step('STEP- '+description,()=>{});
    }

    static async logVerification(description:string){
        await step('VERIFICATION- '+description,()=>{});
    }
}