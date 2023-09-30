import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {ProductDto} from '../../../api';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  @Input() product: ProductDto;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }
  emitAddEvent() {
    this.add.emit(this.product);
  }
}
