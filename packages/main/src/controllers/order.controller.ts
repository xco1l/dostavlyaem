import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Order, User} from '../models';
import {UserRepository} from '../repositories';

export class OrderController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/users/{userId}/orders', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    order: Order,
    @param.path.string('userId')
    userId: string,
  ): Promise<Order> {
    return this.userRepository.orders(userId).create(order);
  }

  @get('/users/{userId}/orders', {
    responses: {
      '200': {
        description: "Array of User's Orders",
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Order}},
          },
        },
      },
    },
  })
  async findOrders(
    @param.path.string('userId') userId: string,
    @param.query.string('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    const orders = await this.userRepository.orders(userId).find(filter);
    return orders;
  }
}
