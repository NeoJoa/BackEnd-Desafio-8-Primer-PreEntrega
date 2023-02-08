import { Router } from "express";
import dbCartsManager from "../dao/dbManager/CartsManager.js";

const router = Router();

const dbcm = new dbCartsManager();

router.post("/", async (req, res) => {
  const addResponse = await dbcm.addCart();

  !addResponse.error
    ? res.send(addResponse)
    : res.status(addResponse.status).send(addResponse);
});

router.get("/:cid", async (req, res) => {
  const id = req.params.cid;
  const getResponse = await dbcm.getCartById(id);

  !getResponse.error
    ? res.send(getResponse)
    : res.status(getResponse.status).send(getResponse);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const updateResponse = await dbcm.addProductToCart(cid, pid);

  !updateResponse.error
    ? res.send(updateResponse)
    : res.status(updateResponse.status).send(updateResponse);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cartUpdated = await dbcm.removeToCart(cid, pid);
  res.send(cartUpdated);
});

export default router;
