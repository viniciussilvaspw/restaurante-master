import {ApiModule} from '../api';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientsListComponent} from './client/clients-list/clients-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientRegisterComponent} from './client/client-register/client-register.component';
import {ItemListComponent} from './item/item-list/item-list.component';
import {ItemRegisterComponent} from './item/item-register/item-register.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing.module';
import {ErrorsModule} from './errors/errors.module';
import {MaterialModule} from './material-module';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductRegisterUpdateComponent} from './product/product-register-update/product-register-update.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductDialogComponent} from './product/product-dialog/product-dialog.component';
import {IMaskModule} from 'angular-imask';
import {TableListComponent} from './tables/table-list/table-list.component';
import {RestaurantComponent} from './restaurants/restaurant/restaurant.component';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import {MenuItemComponent} from './restaurant-detail/menu-item/menu-item.component';
import {MenuComponent} from './restaurant-detail/menu/menu.component';
import {ShoppingCartComponent} from './restaurant-detail/shopping-cart/shopping-cart.component';
import {ShoppingCartService} from './restaurant-detail/shopping-cart/shopping-cart.service';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {OrderComponent} from './order/order.component';
import {DeliveryCostsComponent} from './order/delivery-costs/delivery-costs.component';
import {OrderItemsComponent} from './order/order-items/order-items.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsListComponent,
    ClientRegisterComponent,
    ItemListComponent,
    ItemRegisterComponent,
    ProductListComponent,
    ProductRegisterUpdateComponent,
    ProductDialogComponent,
    TableListComponent,
    RestaurantComponent,
    RestaurantsComponent,
    MenuItemComponent,
    MenuComponent,
    ShoppingCartComponent,
    RestaurantDetailComponent,
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RouterModule,
    FlexModule,
    ExtendedModule,
    AppRoutingModule,
    ErrorsModule,
    MaterialModule,
    FlexLayoutModule,
    IMaskModule
  ],
  providers: [ShoppingCartService],
  bootstrap: [AppComponent],
  entryComponents: [ProductDialogComponent]
})
export class AppModule { }
