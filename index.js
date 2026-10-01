const express = require("express")
const app = express()
const port = 3000
const productRouter = require("./routes/products.router")

app.use(express.json())
app.use('/products',productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
