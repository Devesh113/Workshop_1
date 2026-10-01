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

const putProduct = async(req,res)=>{
    let id = Number(req.params.id)
    let price = Number(req.body.price)
    let name = req.body.name
    let updatedProduct = await productServices.putIntoProduct({id,name,price})
    res.status(200).json(updatedProduct)
}

const patchProduct = async(req,res)=>{
    let id = Number(req.params.id)
    let updatedProduct = await productServices.patchIntoProduct(req.body,id)
    res.status(200).json(updatedProduct)
}

const deleteProduct = async(req,res)=>{
    let id = Number(req.params.id)
    let deletedProduct = await productServices.deleteFromProduct(id)
    res.status(200).json(deletedProduct)
}

module.exports = {
    getProducts,
    getProductId,
    insertProducts,
    putProduct,
    patchProduct,
    deleteProduct
}