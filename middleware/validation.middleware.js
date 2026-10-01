const validatePostReq = (req,res,next) => {
    const {name,price} = req.body
    if (name===undefined || name.trim()==="" || !Number.isInteger(price)){
        return res.status(400).send("error")
    }
    next()
}

module.exports = {
    validatePostReq
}