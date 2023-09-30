import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {
  @Input() itemsValue: number;

  constructor() { }

  ngOnInit() {
  }

  total(): number {
    return this.itemsValue;
  }
}
