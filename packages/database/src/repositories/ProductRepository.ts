import {EntityRepository, AbstractRepository} from 'typeorm';
import {Product} from '../entities';

@EntityRepository(Product)
export class ProductRepository extends AbstractRepository<Product> {
  save(product: Product) {
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  findById(productId: string) {
    return this.repository.findOne({id: productId});
  }
}
