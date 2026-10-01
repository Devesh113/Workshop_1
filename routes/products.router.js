const express = require("express")
const productRouter = express.Router()
const controller = require("../controllers/products.controller")
const productMiddleware = require("../middleware/cacheMemory.middleware")

productRouter.get('/',productMiddleware.productsCache, controller.getProducts)

productRouter.get("/:id",productMiddleware.productsCache,controller.getProductId)

productRouter.post("/",productMiddleware.validatePostReq,productMiddleware.productsCache,controller.insertProducts)

module.exports = productRouter