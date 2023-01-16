import express from "express";
import productsRouter from "./routes/productsRoutes.js";
import cartsRouter from "./routes/cartsRoutes.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productsRouter);
app.use(cartsRouter);
