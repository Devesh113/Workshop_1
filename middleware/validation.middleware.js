const validateProduct = (request, response, next) => {
    const { name, price } = request.body;
    if (typeof name !== "string" || name.trim() === "" || !Number.isFinite(price)) {
        return response.status(400).json({ error: "A name and numeric price are required" });
    }
    next();
};

module.exports = {
    validateProduct
};