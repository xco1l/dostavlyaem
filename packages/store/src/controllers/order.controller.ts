import {inject} from '@loopback/context';
import {get, post, requestBody, getModelSchemaRef, param} from '@loopback/rest';
import {OrderRepository} from '@/db/repositories';
import {Order} from '@/db/entities/Order';
import {User} from '@/db/entities/User';
import {AxiosInstance} from 'axios';
export class OrderController {
  constructor(
    @inject('repositories.OrderRepository')
    protected orderRepo: OrderRepository,
    @inject('services.axios')
    protected axios: AxiosInstance,
  ) {}

  @post('users/{id}/orders')
  async createOrder(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'New order data',
            exclude: ['id'],
          }),
        },
      },
    })
    orderCreditionals: Omit<Order, 'id'>,
    @param.path.string('id') userId: string,
  ) {
    try {
      const result = await this.axios.get(
        `http://localhost:3000/users/${userId}`,
      );
      if (!result.data.user) return {message: 'Not found'};
      const user: User = result.data.user;
      const order = {...new Order(), ...orderCreditionals};
      order.user = user;
      const savedOrder = await this.orderRepo.save(user, order);

      return JSON.stringify(savedOrder);
    } catch (err) {
      console.log(err);
      return {message: 'Error'};
    }
  }

  @get('users/{id}/orders/')
  async getAllOrders(@param.path.string('id') userId: string) {
    try {
      const orders = await this.orderRepo.findAll(userId);
      if (orders) return JSON.stringify(orders);
      return {message: 'Not found'};
    } catch (err) {
      console.log(err);
      return {message: 'Error'};
    }
  }

  @get('users/{id}/orders/{orderId}')
  async getOrderById(
    @param.path.string('id') userId: string,
    @param.path.string('orderId') orderId: string,
  ) {
    return {userId, orderId};
  }
}
