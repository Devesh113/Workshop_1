const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/products.controller");
const cacheMiddleware = require("../middleware/cacheMemory.middleware");
const requestValidation = require("../middleware/validation.middleware");

productsRouter.get("/", cacheMiddleware.cacheProducts, productsController.getProducts);

productsRouter.get("/:id", cacheMiddleware.cacheProducts, productsController.getProductById);

productsRouter.post("/", requestValidation.validateProduct, cacheMiddleware.cacheProducts, productsController.createProduct);

productsRouter.put("/:id", cacheMiddleware.cacheProducts, productsController.replaceProduct);

productsRouter.patch("/:id", cacheMiddleware.cacheProducts, productsController.updateProductFields);

productsRouter.delete("/:id", cacheMiddleware.cacheProducts, productsController.removeProduct);

module.exports = productsRouter;