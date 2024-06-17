import {Router } from 'express'
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/productControllers'
import { verifyToken } from '../middlewares'

const productRouter = Router()


productRouter.get("/:id",verifyToken, getProduct)
productRouter.get("", verifyToken,getProducts)
productRouter.post("", addProduct)
productRouter.put("/:id", updateProduct)
productRouter.delete("/:id",deleteProduct)


export default productRouter