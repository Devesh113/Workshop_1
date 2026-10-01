const database = require("../database/db")

const QueryProduct = async(query) => {
    let filterProduct = await database.delayReadData()
    let {name,minPrice,maxPrice} = query
    minPrice = Number(minPrice)
    maxPrice = Number(maxPrice)
    
    if (name && name.trim()!==""){
        filterProduct = filterProduct.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (minPrice && typeof minPrice === 'number' && Number.isFinite(minPrice)){
        filterProduct = filterProduct.filter(el => el.price>=minPrice)
    }
    if (maxPrice && typeof maxPrice === 'number' && Number.isFinite(maxPrice)){
        filterProduct = filterProduct.filter(el => el.price<=maxPrice)
    }
    return filterProduct
}

const findProductId = async(id) => {
    const data = await database.delayReadData()
    return findProductId.find(el => el.id===id)
}

const insertIntoProducts = async({name,price}) => {
    let data = await database.delayReadData()
    newProduct = {
        id : data.length+1, 
        name, 
        price
    }
    data.push(newProduct)
    await database.writeIntoFile(data)
    return newProduct
}

module.exports = {
    QueryProduct,
    findProductId,
    insertIntoProducts
}