import { ProductDto } from '../../../api';
import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {ProductCategoryDto, ProductItemDto} from '../../../api';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {
  restaurantState = 'ready';
// tslint:disable-next-line:new-parens
  public product: ProductDto = new class implements ProductDto {
    control: string;
    cost: number;
    id: number;
    minQuantity: number;
    name: string;
    price: number;
    productCategoryDto: ProductCategoryDto;
    productItemDtos: Array<ProductItemDto>;
    quantity: number;
    status: string;
  };
  constructor() { }

  ngOnInit() {
  }
}
