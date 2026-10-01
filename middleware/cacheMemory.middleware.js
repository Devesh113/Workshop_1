const delayReadData = require("../database/db")
const cache = {}

const productsCache = async(req,res,next) => {
    let url = req.originalUrl
    let cachedData = cache[url]

    if (req.method!=="GET"){
        Object.keys(cache).forEach((keys)=>{
            if (cache[keys] && keys.startsWith("/products")){
                delete cache[keys]
            }
        })
        next()
        return
    }

    if (cachedData && Date.now()<=cachedData.expiresAt){
        res.set("cache","HIT")
        return res.json(cachedData.data)
    }

    else if (cachedData && Date.now()>cachedData.expiresAt){
        // console.log("new value assgined")
        delete cache[url] 
    }

    res.set("cache","MISS")
    originalJSON  = res.json.bind(res)
    res.json = (data) => {
        cache[url] = {
            data ,
            expiresAt : Date.now()+(60*1000),  
        } 
        return originalJSON(data)
    }
    next()
}

module.exports = {
    productsCache
}