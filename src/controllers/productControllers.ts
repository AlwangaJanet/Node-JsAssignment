import {Request,Response} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import {Product, ProductRequest} from '../models/productModels'


export async function addProduct (request:ProductRequest,response:Response){
    try{
        const id = uid()
        const {name,price,category_id} = request.body
    
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('id',id)
        .input('name',name)
        .input('category_id',category_id)
        .input('price',price)
        .execute('addProduct')

        response.status(200).send({message:"Product added succesfuly"})
    } catch(error) {
        response.status(500).send(error)
    }
}

export async function getProducts  (request:Request,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const products = (await pool.request().execute('getProducts'))
        .recordset as Array<Product>

        response.status(200).send(products)

    } catch(error) {
        response.status(500).send(error)
    }

}

export async function getProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        const product = (await pool.request().input("id",id).execute('getProduct'))
        .recordset[0] as Array<Product>

        if (product ){
            response.status(200).send(product)

        } else {
            response.status(200).send({message:"product not available"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}

export async function updateProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        const product = (await pool.request().input("id",id).execute('getProduct'))//.recordset
        .recordset[0] as Array<Product>

        if (product){
            const {name,price,category_id} = request.body
            await pool.request()
            .input('id',id)
            .input('name',name)
            .input('price',price)
            .input('category_id',category_id)
            .execute('updateProduct')

            response.status(200).send({message:"product updated succesfully!"})

        } else {
            response.status(200).send({message:"product not available"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}

export async function deleteProduct  (request:Request<{id:string}>,response:Response){
    try{
        const pool = await mssql.connect(sqlConfig)
        const id = request.params.id
        const product = (await pool.request().input("id",id).execute('deleteProduct'))
        if (product){
            await pool.request()
            .input('id',id)
            .execute('deleteProduct')

            response.status(200).send({message:"product deleted succesfully!"})

        } else {
            response.status(200).send({message:"product not found"})
        }


    } catch(error) {
        response.status(500).send(error)
    }
}





