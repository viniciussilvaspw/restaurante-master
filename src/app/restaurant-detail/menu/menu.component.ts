import { Component, OnInit } from '@angular/core';
import {ProductControllerService, ProductDto} from '../../../api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  products: ProductDto[];

  constructor(private productService: ProductControllerService) { }

  ngOnInit() {
    this.productService.getAllUsingGET5()
      .subscribe(
        (products) => {
          this.products = products.content;
        }
      );
  }
}
