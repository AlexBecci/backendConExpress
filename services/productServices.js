const faker = require('faker')
const boom = require('@hapi/boom')
class ProductServices {
  constructor() {
    this.products = [];
    this.gerenate();
  }

  gerenate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })

    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }
  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound("product not found")
    }
    if (product.isBlock) {
      throw boom.conflict("product is BLOCK")
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found")
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    };


  }
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("product not found")
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductServices
