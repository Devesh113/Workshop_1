const express = require("express")
const productRouter = express.Router()
const controller = require("../controllers/products.controller")
const productMiddleware = require("../middleware/cacheMemory.middleware")
const productValidations = require("../middleware/validation.middleware")

productRouter.get('/',productMiddleware.productsCache, controller.getProducts)

productRouter.get("/:id",productMiddleware.productsCache,controller.getProductId)

productRouter.post("/",productValidations.validatePostReq,productMiddleware.productsCache,controller.insertProducts)

productRouter.put("/:id",productMiddleware.productsCache,controller.putProduct)

productRouter.patch("/:id",productMiddleware.productsCache,controller.patchProduct)

productRouter.delete("/:id",productMiddleware.productsCache,controller.deleteProduct)

module.exports = productRouter