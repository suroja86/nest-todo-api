import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products]; // not products - copy of array
  }

  getOneProduct(prodId: string) {
    const product = this.products.find((prod) => prod.id == prodId);
    if(!product) {
      throw new NotFoundException('Could not find');
    }
    return { ...product };
  }
}