const fs = require("fs/promises")
const path = require("path")
const filePath = path.join(__dirname,"db.json")

const readData = async() => {
    try {
        let RawData = await fs.readFile(filePath,'utf-8')
        return JSON.parse(RawData)
    }
    catch (err) {
        return {"error" : `found error on reading file ${err}`}
    }
}
const delayReadData = async() => {
    await new Promise((res,rej)=>{
        setTimeout(res,(5*1000))
    })
    return await readData()
}
const writeIntoFile = (data) => {
    return fs.writeFile(filePath,JSON.stringify(data,null,2))
}

module.exports = {
    delayReadData,
    writeIntoFile
}