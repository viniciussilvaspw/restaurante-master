import { Injectable } from '@angular/core';
import {NotificationService} from '../../shared/messages/notification.service';
import {CartItem} from './cart-item.model';
import {ProductDto} from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private notificationService: NotificationService) { }
  items: CartItem[] = [];

  clear() {
    this.items = [];
  }
  addItem(item: ProductDto) {
    const foundItem = this.items.find((mItem) => mItem.product.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    this.notificationService.notify(`Você adicionou o item ${item.name}`);
  }
  public increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  public decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(`Você removeu o item ${item.product.name}`);
  }
  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }
}
