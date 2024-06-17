import {Request} from 'express'
 
export interface User{
    Id:string,
    username:string,
    Email:string,
    password:string,
    isDeleted?:string,  //set property to optional
    isEmailSent?:string //set property to optional
}

export interface Payload{
    Id:string,
    username:string
}