import {Router} from 'express'
import {addCategory, getCategories, getCategory} from '../controllers/categoriesControllers'

const categoriesRouter = Router()

categoriesRouter.post("", addCategory)
categoriesRouter.get("", getCategories)
categoriesRouter.get("/:id", getCategory)


export default categoriesRouter