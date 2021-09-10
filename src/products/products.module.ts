import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
