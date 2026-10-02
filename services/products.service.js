const database = require("../database/db");

const queryProducts = async (queryParameters) => {
    let matchingProducts = await database.readProducts();
    const { name, minPrice, maxPrice } = queryParameters;
    const lowerBound = Number(minPrice);
    const upperBound = Number(maxPrice);

    if (typeof name === "string" && name.trim() !== "") {
        const searchTerm = name.toLowerCase();
        matchingProducts = matchingProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }
    if (minPrice !== undefined && Number.isFinite(lowerBound)) {
        matchingProducts = matchingProducts.filter((product) => product.price >= lowerBound);
    }
    if (maxPrice !== undefined && Number.isFinite(upperBound)) {
        matchingProducts = matchingProducts.filter((product) => product.price <= upperBound);
    }
    return matchingProducts;
};

const findProductById = async (productId) => {
    const products = await database.readProducts();
    return products.find((product) => product.id === productId);
};

const createProduct = async ({ name, price }) => {
    const products = await database.readProducts();
    const productToAdd = {
        id: products.length + 1,
        name,
        price
    };
    products.push(productToAdd);
    await database.writeProducts(products);
    return productToAdd;
};

const replaceProduct = async (replacement) => {
    const products = await database.readProducts();
    const replacedProducts = products.map((product) => {
        if (product.id === replacement.id) {
            return replacement;
        }
        return product;
    });
    await database.writeProducts(replacedProducts);
    return replacement;
};

const updateProductFields = async (changes, productId) => {
    const products = await database.readProducts();
    const editableFields = ["name", "price"];
    let updatedProduct;
    const updatedProducts = products.map((product) => {
        if (product.id === productId) {
            editableFields.forEach((fieldName) => {
                if (changes[fieldName] !== undefined) {
                    product[fieldName] = changes[fieldName];
                }
            });
            updatedProduct = product;
        }
        return product;
    });
    await database.writeProducts(updatedProducts);
    return updatedProduct;
};

const removeProduct = async (productId) => {
    const products = await database.readProducts();
    const removedProduct = products.find((product) => product.id === productId);
    const remainingProducts = products.filter((product) => product.id !== productId);
    await database.writeProducts(remainingProducts);
    return removedProduct;
};

module.exports = {
    queryProducts,
    findProductById,
    createProduct,
    replaceProduct,
    updateProductFields,
    removeProduct
};