import { Component, OnInit } from '@angular/core';
import {
  ItemCategoryControllerService, ItemCategoryDto,
  ItemControllerService, ItemDto,
  ProviderControllerService, ProviderDto
} from '../../../api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.css']
})
export class ItemRegisterComponent implements OnInit {
  public categoryList: ItemCategoryDto[] = [];
  public providerList: ProviderDto[] = [];
  public selectedCategory: ItemCategoryDto;
  public selectedProvider: ProviderDto;
  public formItem: FormGroup;
  units: string[] = ['UN', 'KG', 'LT'];
  private edit = false;
  public imaskConfig = {
    mask: Number,
    scale: 2,  // digits after point, 0 for integers
    thousandsSeparator: '',  // any single char
    padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,  // appends or removes zeros at ends
    radix: ','  // fractional delimiter
  };

  // tslint:disable-next-line:new-parens
  public item: ItemDto = new class implements ItemDto {
    cost: number;
    id: number;
    itemCategoryDto: ItemCategoryDto;
    minQuantity: number;
    name: string;
    providerDto: ProviderDto;
    quantity: number;
    shelfLife: number;
    status: string;
    unit: string;
  };

  constructor(
    private itemService: ItemControllerService,
    private categoryService: ItemCategoryControllerService,
    private providerService: ProviderControllerService,
    private formBuilder: FormBuilder,
    private mensageSnack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    this.formBuild();
    this.route.params.subscribe(params => {

      if (params.id !== undefined) {
        this.edit = true;
        this.itemService.findByIdUsingGET3(params.id).subscribe((res: ItemDto) => {
          this.item = res;
          this.formBuild();
          console.log(res);
        });
      }
    });
  }
  private getData() {
    this.categoryService.getAllUsingGET2().subscribe(category => {
      this.categoryList = category.content;
      this.formBuild();
    });
    this.providerService.getAllUsingGET6().subscribe( provider => {
      this.providerList = provider.content;
      this.formBuild();
    });
  }
  public isEdit(): boolean {
    return this.edit;
  }
  private formBuild() {
    this.formItem = this.formBuilder.group({
      id: [this.item.id],
      name: [this.item.name, Validators.compose([
        RxwebValidators.required()
      ])],
      cost: [this.item.cost, Validators.compose([
        RxwebValidators.required()
      ])],
      unit: [this.item.unit, Validators.compose([
        RxwebValidators.required()
      ])],
      quantity: [this.item.quantity, Validators.compose([
        RxwebValidators.required()
      ])],
      minQuantity: [this.item.minQuantity, Validators.compose([
        RxwebValidators.required()
      ])],
      shelfLife: [this.item.shelfLife, Validators.compose([
        RxwebValidators.required()
      ])],
      itemCategoryDto: [this.item.itemCategoryDto, Validators.compose([
        RxwebValidators.required()
      ])],
      providerDto: [this.item.providerDto, Validators.compose([
        RxwebValidators.required()
      ])]
    });
  }
  private setItem() {
    this.item.id = null;
    this.item.name = this.formItem.value.name;
    this.item.cost = this.formItem.value.cost;
    this.item.unit = this.formItem.value.unit;
    this.item.quantity = this.formItem.value.quantity;
    this.item.minQuantity = this.formItem.value.minQuantity;
    this.item.shelfLife = this.formItem.value.shelfLife;
    this.item.itemCategoryDto = this.formItem.value.itemCategoryDto;
    this.item.providerDto = this.formItem.value.providerDto;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.formItem.get(controlName).hasError(errorName);
  }
  public save() {
      this.setItem();
      console.log(this.item);
      this.itemService.createUsingPOST3(this.item)
        .subscribe(() => {
            this.router.navigate(['/item/list']);
            this.mensageSnack.open('Item cadastrado com sucesso!', null, {
              duration: 3000
            });
            this.formItem.reset();
          }, err => {
            this.mensageSnack.open(err.error.message, null, {
              duration: 3000
            });
          }
        );
  }

  public update() {
    this.setItemToSave();

    if (this.formItem.valid) {
      this.itemService.updateUsingPUT3(this.item).subscribe(res => {
        this.item = res;
        this.router.navigate(['/item/list']);
        this.mensageSnack.open('Insumo Atualizado Com Sucesso!', null, {
          duration: 3000
        });
      }, err => {
        this.mensageSnack.open(err.error.message, null, {
          duration: 3000
        });
      });
    } else {
      this.launchInvalidFormMessage();
    }
  }
  private launchInvalidFormMessage() {
    this.mensageSnack.open('Formulário inválido', null, {
      duration: 3000
    });
  }
  private setItemToSave() {
    this.item.name = this.formItem.get('name').value;
    this.item.cost = this.formItem.get('cost').value;
    this.item.unit = this.formItem.get('unit').value;
    this.item.quantity = this.formItem.get('quantity').value;
    this.item.minQuantity = this.formItem.get('minQuantity').value;
    this.item.shelfLife = this.formItem.get('shelfLife').value;
    this.item.itemCategoryDto.id = this.formItem.get('itemCategoryDto').value.id;
    this.item.providerDto.id = this.formItem.get('providerDto').value.id;
   }

  compareCategory(c1: ItemCategoryDto, c2: ItemCategoryDto): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareProvider(p1: ProviderDto, p2: ProviderDto): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }
}
