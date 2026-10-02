const express = require("express");
const application = express();
const listenPort = 3000;
const productsRouter = require("./routes/products.router");

application.use(express.json());
application.use("/products", productsRouter);

application.use((error, request, response, next) => {
  console.error(error);
  if (response.headersSent) {
    return next(error);
  }

  response.status(500).json({ error: "Internal server error" });
});

application.listen(listenPort, () => {
  console.log(`Product service listening on port ${listenPort}`);
});
