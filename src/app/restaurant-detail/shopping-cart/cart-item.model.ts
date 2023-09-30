import {ProductDto} from '../../../api';

export class CartItem {
  constructor(public product: ProductDto,
              public quantity: number = 1) {}

  value(): number {
    return this.product.price * this.quantity;
  }
}
