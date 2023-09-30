import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CashierControllerService } from './api/cashierController.service';
import { ClientControllerService } from './api/clientController.service';
import { ItemCategoryControllerService } from './api/itemCategoryController.service';
import { ItemControllerService } from './api/itemController.service';
import { ProductCategoryControllerService } from './api/productCategoryController.service';
import { ProductControllerService } from './api/productController.service';
import { ProviderControllerService } from './api/providerController.service';
import { SaleControllerService } from './api/saleController.service';
import { TablesControllerService } from './api/tablesController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CashierControllerService,
    ClientControllerService,
    ItemCategoryControllerService,
    ItemControllerService,
    ProductCategoryControllerService,
    ProductControllerService,
    ProviderControllerService,
    SaleControllerService,
    TablesControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
