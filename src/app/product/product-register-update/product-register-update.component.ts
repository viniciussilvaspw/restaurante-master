import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  ItemControllerService,
  ItemDto, PageItemDto,
  ProductCategoryControllerService,
  ProductCategoryDto,
  ProductControllerService,
  ProductDto, ProductItemDto,
} from '../../../api';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {even, RxwebValidators} from '@rxweb/reactive-form-validators';
import {CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-register-update',
  templateUrl: './product-register-update.component.html',
  styleUrls: ['./product-register-update.component.css']
})
export class ProductRegisterUpdateComponent implements OnInit {
  public  productForm: FormGroup ;
  public selectedCategory: ProductCategoryDto;
  public categoryList: ProductCategoryDto[] = [];
  public edit = false;
  public items: ItemDto[];
  public fichaTecnica: ItemDto[] = [];
  public calculatedCost = 0;
  public imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
  // tslint:disable-next-line:new-parens
  public product: ProductDto = new class implements ProductDto {
    cost: number = null;
    id: number = null;
    minQuantity: number = null;
    name: string = null;
    price: number = null;
    productCategoryDto: ProductCategoryDto;
    productItemDtos: ProductItemDto[] = [];
    control: string = null;
    quantity: number = null;
    status: string = null;
  };

  constructor(private productService: ProductControllerService,
              private categoryService: ProductCategoryControllerService,
              private itemService: ItemControllerService,
              private formBuilder: FormBuilder,
              private mensageSnack: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
    this.formBuild();
    console.log(this.product);
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.edit = true;
        this.productService.findByIdUsingGET5(params.id).subscribe((res: ProductDto) => {
          console.log(res);
          this.product = res;
          this.calculatedCost = this.product.cost;
          for (const ficha of this.product.productItemDtos) {
            this.fichaTecnica.push(ficha.itemDto);
          }
          this.formBuild();
          console.log(res);
        });
      }
    });
    console.log(this.product);
  }

  private getData() {
    this.categoryService.getAllUsingGET4().subscribe(category => {
      this.categoryList = category.content;
      this.formBuild();
    });
    this.itemService.getAllUsingGET3().subscribe((items: PageItemDto) => this.items = items.content);
  }
  public isEdit(): boolean {
    return this.edit;
  }
  private formBuild() {
    this.productForm = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, Validators.compose([
        RxwebValidators.required()
      ])],
      price: [this.product.price, Validators.compose([
        RxwebValidators.required()
      ])],
      cost: [this.calculatedCost, Validators.compose([
        RxwebValidators.required()
      ])],
      control: [this.product.control ? this.product.control : 'Não', Validators.compose([
        RxwebValidators.required()
      ])],
      quantity: [this.product.quantity],
      minQuantity: [this.product.minQuantity],
      productCategoryDto: [this.product.productCategoryDto, Validators.compose([
      RxwebValidators.required()
      ])],
    });
  }
  private setProduct() {
    this.product = Object.assign(this.product, this.productForm.value);
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.get(controlName).hasError(errorName);
  }
  public save() {
    this.setProduct();
    console.log(this.product);
    this.productService.createUsingPOST5(this.product)
      .subscribe(() => {
          this.router.navigate(['/product/list']);
          this.mensageSnack.open('Produto cadastrado com sucesso!', null, {
            duration: 3000
          });
          this.productForm.reset();
        }, err => {
          this.mensageSnack.open(err.message, null, {
            duration: 3000
          });
        }
      );
  }

  public update() {
    console.log(this.product);
    this.setProduct();
    console.log(this.product);
    if (this.productForm.valid) {
      this.productService.updateUsingPUT5(this.product).subscribe(res => {
        // this.product = res;
        this.router.navigate(['/product/list']);
        this.mensageSnack.open('Produto Atualizado Com Sucesso!', null, {
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
  compareCategory(pc1: ProductCategoryDto, pc2: ProductCategoryDto): boolean {
    return pc1 && pc2 ? pc1.id === pc2.id : pc1 === pc2;
  }
  setItemsInProduct(item: ProductItemDto, qtd: number) {
      if (this.product.productItemDtos.find(
        (products) => products.itemDto.id === item.id) === undefined) {
        this.product.productItemDtos.push({
          productDto: {
            id: (this.edit) ? this.product.id : null,
            name: (this.edit) ? this.product.name : null,
            price: (this.edit) ? this.product.price : null,
            cost: (this.edit) ? this.product.cost : null,
            control: (this.edit) ? this.product.control : null,
            quantity: (this.edit) ? this.product.quantity : null,
            minQuantity: (this.edit) ? this.product.minQuantity : null,
          },
          id: null,
          itemDto: item,
          qtde: qtd
        });
    }
  }
  alreadyIntoArray(item: CdkDrag<ItemDto>, array: CdkDropList<ItemDto[]>) {
    if (array.data.find((insumos) => insumos.id === item.data.id)) {
      return false;
    } else {
      return true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      if (event.container.id !== 'ck1')  {
        console.log(event);
        this.openDialog(event.item.data, event);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        console.log(event);
        const qt = this.product.productItemDtos[event.previousIndex].qtde;
        const cost = this.product.productItemDtos[event.previousIndex].itemDto.cost;
        this.calculatedCost -= qt * cost;
        this.removeItemFromProduct(event.previousIndex);
        console.log(this.product);
      }
    }
  }

  openDialog(item, event: CdkDragDrop<string[]>) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.status !== 'CANCEL') {
        console.log(event);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.container.data.length);
        this.setItemsInProduct(item, result.qtd);
        console.log(result.qtd * item.cost);
        this.calculatedCost += result.qtd * item.cost;
      }
    });
  }

  removeItemFromProduct(index: number) {
    this.product.productItemDtos.splice(index, 1);
    console.log(this.product);
  }
}
