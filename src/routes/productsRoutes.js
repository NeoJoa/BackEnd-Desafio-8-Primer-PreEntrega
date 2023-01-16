import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const pm = new ProductManager();

router.get("/api/products?", async (req, res) => {
  const limit = +req.query.limit;
  const response = await pm.getProducts(limit);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.get("/api/products/:pid", async (req, res) => {
  const id = +req.params.pid;
  const response = await pm.getProductById(id);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.post("/api/products", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  } = req.body;
  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const response = await pm.addProduct(product);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.put("/api/products/:pid", async (req, res) => {
  const id = +req.params.pid;
  const object = req.body;
  const response = await pm.updateProduct(id, object);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.delete("/api/products/:pid", async (req, res) => {
  const id = +req.params.pid;
  const response = await pm.deleteProduct(id);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

export default router;
