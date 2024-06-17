import {Request} from 'express'

export interface Product{
    id: string,
    name: string,
    price:number,
    category_id: string
}

export interface ProductRequest extends Request{
    body:{
        name: string,
        price: number,
        category_id : string
    }
}

 //export default Product