import fs from "fs";
import ProductManager from "./ProductManager.js";
const pm = new ProductManager();
export default class CartsManager {
  constructor() {
    this.id = 0;
    this.path = "src/cartBase.json";
  }

  async addCart() {
    const carts = await this.getCarts();
    if (carts.error) {
      return carts;
    }
    let id = carts.length + 1;
    const idFinded = carts.find((cart) => cart.id === id);
    if (id === idFinded?.id) id++;
    const newCart = { id, products: [] };
    carts.push(newCart);
    return await this.writeFile(carts);
  }

  async getCarts() {
    try {
      const document = await fs.promises.readFile(this.path);
      const carts = JSON.parse(document);
      return carts;
    } catch (error) {
      return {
        status: 500,
        error:
          "Ha ocurrido un error al momento de leer el archivo, este error proviene del servidor y estamos trabajando para arreglarlo.",
      };
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    if (!carts.error) {
      const cart = carts.find((cart) => cart.id === id);
      if (cart) {
        const cartIndex = carts.findIndex((cart) => cart.id === id);
        return { cart, cartIndex };
      } else {
        return { status: 404, error: "No se encontro un carrito con este ID" };
      }
    } else {
      return carts;
    }
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const { cart, cartIndex } = await this.getCartById(cid);
    if (!carts.error && !cart.error) {
      const product = cart.products.find(
        (product) => product.productId === pid
      );
      if (product) {
        const productIndex = cart.products.findIndex(
          (product) => product.productId === pid
        );
        product.quantity++;
        carts[cartIndex].products.splice(productIndex, 1, product);
        return await this.writeFile(carts);
      } else {
        const getProduct = await pm.getProductById(pid);
        if (!getProduct.error) {
          carts[cartIndex].products.push({ productId: pid, quantity: 1 });
          return await this.writeFile(carts);
        } else {
          return getProduct;
        }
      }
    } else {
      return carts || cart;
    }
  }

  async removeToCart(cid, pid) {
    const carts = await this.getCarts();
    const { cart, cartIndex } = await this.getCartById(cid);
    if (!carts.error && !cart.error) {
      const product = cart.products.find(
        (product) => product.productId === pid
      );
      if (product) {
        const productIndex = cart.products.findIndex(
          (product) => product.productId === pid
        );
        carts[cartIndex].products.splice(productIndex, 1);
        await this.writeFile(carts);
        return {
          status: "Ok",
          message: "Producto removido del carrito exitosamente",
        };
      } else {
        return {
          status: 404,
          error: "No se encontro un producto con este ID en este carrito",
        };
      }
    } else {
      return carts || cart;
    }
  }

  async writeFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data));
      return { status: "Ok", message: "Agregado exitosamente" };
    } catch (error) {
      return {
        status: 500,
        error:
          "Ha ocurrido un error al momento de escribir el archivo, este error proviene del servidor y estamos trabajando para arreglarlo.",
      };
    }
  }
}
