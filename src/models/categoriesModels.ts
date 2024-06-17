import {Request} from 'express'

export interface Category{
    Id: string,
    Name: string
}

export interface CategoryRequest extends Request{
    body:{
        Name: string,
    }
}