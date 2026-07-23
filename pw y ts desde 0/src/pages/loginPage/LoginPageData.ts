export class LoginPageData{
    get credentials(){
        return{
            username:{
                standartUser:'standard_user'
            },
            password:{
                passwordUser: 'secret_sauce'
            },
            passwordInvalid:{
                passwordUser: 'password_invalid'
            }
        }
    }
}