const productServices = require("../services/products.service")

const getProducts = async(req,res) => {
    const products = await productServices.QueryProduct(req.query)
    res.json(products)
}

const getProductId = async(req,res)=>{
    let id = Number(req.params.id)
    let productID = await productServices.findProductId(id)
    res.json(productID)
}

const insertProducts = async(req,res)=>{
    let product = await productServices.insertIntoProducts(req.body)
    res.status(201).json(product)
}

module.exports = {
    getProducts,
    getProductId,
    insertProducts
}