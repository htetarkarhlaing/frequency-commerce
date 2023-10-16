import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { ProductService } from './product.service';
import { CreateProductInput } from 'src/graphql';
import { join } from 'path';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query('getProduct')
  getProduct(@Args('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Query('getProducts')
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('data') data: CreateProductInput,
    @Args('image', { type: () => GraphQLUpload }) image: Upload,
  ) {
    const { name, price, description, categoryId } = data;

    const { filename, createReadStream } = await image.promise;

    const uniqueFileName = `${Date.now()}-${filename}`;

    const basePath = './';

    const dirPath = join(basePath, '/uploads');

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    const writeStream = createWriteStream(`${dirPath}/${uniqueFileName}`);

    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject),
    );

    const createdProduct = await this.productService.createProduct({
      name,
      price,
      description,
      categoryId,
      image: uniqueFileName,
    });

    return createdProduct;
  }
}
