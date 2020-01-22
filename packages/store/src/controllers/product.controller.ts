import {inject} from '@loopback/context';
import {get, post, requestBody, getModelSchemaRef, param} from '@loopback/rest';
import {ProductRepository} from '@/db/repositories';
import {Product} from '@/db/entities';

export class ProductController {
  constructor(
    @inject('repositories.ProductRepository')
    protected productRepo: ProductRepository,
  ) {}

  @post('products')
  async createProduct(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'New product data',
            exclude: ['id'],
          }),
        },
      },
    })
    productCreditionals: Omit<Product, 'id'>,
  ) {
    const product: Product = {...new Product(), ...productCreditionals};
    const savedProduct = await this.productRepo.save(product);

    return savedProduct;
  }

  @get('products/{id}')
  async getProductById(@param.path.string('id') productId: string) {
    const product = await this.productRepo.findById(productId);

    return product;
  }
}
