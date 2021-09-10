import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedID = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedID };
  }
  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getOneProduct(prodId);
  }
}