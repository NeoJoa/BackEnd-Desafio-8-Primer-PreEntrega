import { productModel } from "../models/products.model.js";
export default class ProductManager {
  constructor() {}

  async getProducts(limit) {
    try {
      return !limit
        ? await productModel.find()
        : productModel.find().limit(limit);
    } catch (error) {
      return {
        status: 500,
        error:
          "Ha ocurrido un error al momento de leer la base de datos, este error proviene del servidor y estamos trabajando para arreglarlo.",
      };
    }
  }

  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return {
        status: 500,
        error: "Ha ocurrido un error mientras se creaba el producto",
      };
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      if (product === null)
        return {
          status: 404,
          error: `No se encontro el producto con el ID: ${id}`,
        };
      return product;
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se obtenia el producto con el ID: ${id}`,
      };
    }
  }

  async updateProduct(id, object) {
    try {
      const productUpdated = await productModel.findByIdAndUpdate(id, object, {
        new: true,
      });
      return productUpdated === null
        ? {
            status: 404,
            error: `No se encontro el producto con el ID: ${id}`,
          }
        : productUpdated;
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se actualizaba el producto con el ID: ${id}`,
      };
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await productModel.findByIdAndDelete(id);
      return productDeleted === null
        ? {
            status: 404,
            error: `No se encontro el producto con el ID: ${id}`,
          }
        : {
            status: 200,
            message: `El producto ${id} fue borrado exitosamente`,
          };
    } catch (error) {
      return {
        status: 500,
        error: `Ha ocurrido un error mientras se actualizaba el producto con el ID: ${id}`,
      };
    }
  }
}
