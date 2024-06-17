import { Request, Response,RequestHandler} from "express"
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config"
import mssql from 'mssql'
import { registerSchema } from "../helpers"
import bcrypt from  'bcrypt'
import { Payload, User } from "../models/authModels"
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const registerUser = async (req: Request, res: Response) => {
    try {
      const Id = uid()
      const { username, email, password } = req.body
      const { error } = registerSchema.validate(req.body)
  
      if (error) {
        return res.status(400).send(error.details[0].message)
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        let pool = await mssql.connect(sqlConfig)
        await pool.request()
          .input('Id', Id)
          .input('username', username)
          .input('email', email)
          .input('password', hashedPassword)
          .execute('addUser')
  
        res.status(200).send({ message: "User added..." })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }

  export const loginUser = async (req:Request, res:Response)=>{
    try {
        const {email, password } = req.body
        let pool = await mssql.connect(sqlConfig)
        let User = (await pool.request()
            .input('email', email)
            .execute('getUser')).recordset as User[]

            if (User.length!==0) {
                const isValid = await bcrypt.compare(password,User[0].password)
                if (isValid) {

                    const payload:Payload = {
                        Id:User[0].Id,
                        username:User[0].username,
                    }
                    const token = jwt.sign(payload,process.env.SECRET as string, {expiresIn:'1h'})
                    return res.status(200).json({message:"Login successfully...", token})
                }
            }
                return res.status(400).json({message:"Invalid credentials..."})

    } catch (error) {
        return res.status(500).json(error)
    }
  }

