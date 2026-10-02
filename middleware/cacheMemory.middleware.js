const responseCache = new Map();
const cacheLifetimeMs = 60 * 1000;

const cacheProducts = (request, response, next) => {
    const cacheKey = request.originalUrl;

    if (request.method !== "GET") {
        responseCache.clear();
        return next();
    }

    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse && Date.now() <= cachedResponse.expiresAt) {
        response.set("Cache", "HIT");
        return response.json(cachedResponse.payload);
    }

    if (cachedResponse) {
        responseCache.delete(cacheKey);
    }

    response.set("Cache", "MISS");
    const sendJson = response.json.bind(response);
    response.json = (payload) => {
        responseCache.set(cacheKey, {
            payload,
            expiresAt: Date.now() + cacheLifetimeMs
        });
        return sendJson(payload);
    };
    next();
};

module.exports = {
    cacheProducts
};