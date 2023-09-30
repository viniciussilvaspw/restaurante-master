import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemListComponent} from './item/item-list/item-list.component';
import {ItemRegisterComponent} from './item/item-register/item-register.component';
import {ClientRegisterComponent} from './client/client-register/client-register.component';
import {ClientsListComponent} from './client/clients-list/clients-list.component';
import {ProductRegisterUpdateComponent} from './product/product-register-update/product-register-update.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {TableListComponent} from './tables/table-list/table-list.component';
import {MenuItemComponent} from './restaurant-detail/menu-item/menu-item.component';
import {MenuComponent} from './restaurant-detail/menu/menu.component';
import {ShoppingCartComponent} from './restaurant-detail/shopping-cart/shopping-cart.component';
import {OrderComponent} from "./order/order.component";
const routes: Routes = [
  { path: 'item/list', component: ItemListComponent},
  { path: 'item/register', component: ItemRegisterComponent},
  { path: 'item/update/:id', component: ItemRegisterComponent},
  { path: 'client/update/:id', component: ClientRegisterComponent},
  { path: 'client/register', component: ClientRegisterComponent},
  { path: 'client/list', component: ClientsListComponent},
  { path: 'product/list', component: ProductListComponent},
  { path: 'product/register', component: ProductRegisterUpdateComponent},
  { path: 'product/update/:id', component: ProductRegisterUpdateComponent},
  { path: 'table-list', component: TableListComponent},
  { path: 'menu-item', component: MenuItemComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'menu/:id', component: MenuComponent},
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'order', component: OrderComponent},
  { path: '**', component: ProductListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
