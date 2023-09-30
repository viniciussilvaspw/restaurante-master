import {Component, OnInit, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export interface Pageable {
  content: Array<any>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('food', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/item.svg'));
    iconRegistry.addSvgIcon('store', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/store.svg'));
    iconRegistry.addSvgIcon('clients', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clientes.svg'));
    iconRegistry.addSvgIcon('estoque', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/estoque.svg'));
    iconRegistry.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/moreIcon.svg'));
    iconRegistry.addSvgIcon('fast-food', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/food.svg'));
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/searchIcon.svg'));
    iconRegistry.addSvgIcon('tables', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dinner-table.svg'));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    iconRegistry.addSvgIcon('cart', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cart.svg'));
    iconRegistry.addSvgIcon('trash', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/trash.svg'));
    iconRegistry.addSvgIcon('card', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/card.svg'));
    iconRegistry.addSvgIcon('x', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/x.svg'));
    iconRegistry.addSvgIcon('plus', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg'));
    iconRegistry.addSvgIcon('minus', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/minus.svg'));
  }

  ngOnInit() {
  }
}
