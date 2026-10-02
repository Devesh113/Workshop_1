const fileSystem = require("fs/promises");
const path = require("path");
const productsFile = path.join(__dirname, "db.json");

const readProducts = async () => {
    try {
        const fileContents = await fileSystem.readFile(productsFile, "utf-8");
        const parsedProducts = JSON.parse(fileContents);
        if (!Array.isArray(parsedProducts)) {
            throw new Error("Product data must be an array");
        }
        return parsedProducts;
    } catch (error) {
        throw new Error(`Unable to read product data: ${error.message}`, { cause: error });
    }
};

const writeProducts = async (products) => {
    try {
        await fileSystem.writeFile(productsFile, JSON.stringify(products, null, 2));
    } catch (error) {
        throw new Error(`Unable to save product data: ${error.message}`, { cause: error });
    }
};

module.exports = {
    readProducts,
    writeProducts
};