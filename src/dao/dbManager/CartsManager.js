import ProductManager from "./ProductsManager.js";
import { cartModel } from "../models/carts.model.js";

const dbpm = new ProductManager();

export default class CartsManager {
  constructor() {}

  async addCart() {
    try {
      return await cartModel.create({ products: [] });
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se actualizaba el producto con el ID: ${id}`,
      };
    }
  }

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se obtenia el producto con el ID: ${id}`,
      };
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      if (cart === null)
        return {
          status: 404,
          error: `No se encontro el carrito con el ID: ${id}`,
        };
      return cart.products;
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se obtenia el producto con el ID: ${id}`,
      };
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cartFinded = await this.getCartById(cid);
      if (cartFinded.status === 404 || cartFinded.error)
        return {
          status: 404,
          error: `No se encontro el carrito con el ID: ${cid}`,
        };

      const productFinded = await dbpm.getProductById(pid);
      if (productFinded.status === 404 || productFinded.error)
        return {
          status: 404,
          error: `No se encontro el producto con el ID: ${pid}`,
        };

      const productInCart = cartFinded.find((product) => product.pid === pid);
      if (productInCart) {
        const productIndex = cartFinded.findIndex(
          (product) => product.pid === pid
        );
        const newCart = cartFinded;
        newCart[productIndex].quantity++;
        return await cartModel.findByIdAndUpdate(cid, { products: newCart });
      }

      return await cartModel.findByIdAndUpdate(cid, {
        $push: { products: { pid, quantity: 1 } },
      });
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se agregaba el producto`,
      };
    }
  }

  async removeToCart(cid, pid) {
    try {
      const cartFinded = await this.getCartById(cid);
      if (cartFinded.status === 404 || cartFinded.error)
        return {
          status: 404,
          error: `No se encontro el carrito con el ID: ${cid}`,
        };

      const productInCart = cartFinded.find((product) => product.pid === pid);
      if (!productInCart) {
        return {
          status: 404,
          error: `No se encontro el producto con el ID: ${pid}`,
        };
      }
      return await cartModel.findByIdAndUpdate(cid, {
        $pull: { products: { pid } },
      });
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se borraba el producto con el ID: ${pid}`,
      };
    }
  }
}
