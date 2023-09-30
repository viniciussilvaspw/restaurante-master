import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDrawer, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {PageProductDto, ProductControllerService, ProductDto} from '../../../api';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @Output() showHideRightSideNav: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatDrawer, {static: true}) drawer: MatDrawer;
  public edit = false;
  public product: ProductDto[];
  public displayedColumns: string[] = ['id', 'name', 'price', 'cost', 'productCategoryDto', 'options'];
  public tdWidth = 100 / (this.displayedColumns.length - 1);
  public pageSizeOptions: number[] = [5, 10, 25, 50];
  public selectedSizePage = 5;
  public resultsLength = 0;
  public isLoadingResults = true;
  private paramFilter: string = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private productService: ProductControllerService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.paginate();
  }
  public paginate() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productService.findByNameUsingGET2(
            this.selectedSizePage,
            'ASC',
            this.paramFilter,
            'id',
            this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe((data: PageProductDto) => {
      if (data && data.content && data.content.length === 0 && data.totalElements > 0) {
        this.paginator.pageIndex -= 1;
        this.paginate();
      }
      this.product = data.content;
    });
  }
  public deleteProduct(product: ProductDto) {
    this.productService.deleteUsingDELETE5(product.id).subscribe(res => {
      this.paginate();
      this.snackBar.open('Deletado com Sucesso!', null, {
        duration: 3000
      });
    }, err => {
      this.snackBar.open(err.error.message, null, {
        duration: 3000
      });
    });
  }
  public changePageSize(event) {
    this.selectedSizePage = event.value;
    this.paginator.pageIndex = 0;
    this.paginate();
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.paramFilter = filterValue.toLowerCase();
    this.paginator.pageIndex = 0;
    this.paginate();
  }
}
