const productService = require("../services/products.service");

const getProducts = async (request, response, next) => {
    try {
        const productList = await productService.queryProducts(request.query);
        response.json(productList);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (request, response, next) => {
    try {
        const productId = Number(request.params.id);
        const matchingProduct = await productService.findProductById(productId);
        response.json(matchingProduct);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (request, response, next) => {
    try {
        const createdProduct = await productService.createProduct(request.body);
        response.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

const replaceProduct = async (request, response, next) => {
    try {
        const productId = Number(request.params.id);
        const replacement = {
            id: productId,
            name: request.body.name,
            price: Number(request.body.price)
        };
        const savedProduct = await productService.replaceProduct(replacement);
        response.json(savedProduct);
    } catch (error) {
        next(error);
    }
};

const updateProductFields = async (request, response, next) => {
    try {
        const productId = Number(request.params.id);
        const savedProduct = await productService.updateProductFields(request.body, productId);
        response.json(savedProduct);
    } catch (error) {
        next(error);
    }
};

const removeProduct = async (request, response, next) => {
    try {
        const productId = Number(request.params.id);
        const removedProduct = await productService.removeProduct(productId);
        response.json(removedProduct);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProductFields,
    removeProduct
};