import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClientControllerService, ClientDto, PageClientDto} from '../../../api';
import {MatDrawer, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  @Output() showHideRightSideNav: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatDrawer, {static: true}) drawer: MatDrawer;
  public edit = false;
  public displayedColumns: string[] = ['id', 'name', 'rg', 'cpf', 'options'];
  public client: ClientDto[];
  public tdWidth = 100 / (this.displayedColumns.length - 1);
  public pageSizeOptions: number[] = [5, 10, 25, 50];
  public selectedSizePage = 5;
  public resultsLength = 0;
  public isLoadingResults = true;
  private paramFilter: string = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private clientService: ClientControllerService, private snackBar: MatSnackBar) { }

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
          return this.clientService.findByNameUsingGET(
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
      ).subscribe((data: PageClientDto) => {
      if (data && data.content && data.content.length === 0 && data.totalElements > 0) {
        this.paginator.pageIndex -= 1;
        this.paginate();
      }
      this.client = data.content;
    });
  }
  public deleteCliente(cliente: ClientDto) {
    this.clientService.deleteUsingDELETE1(cliente.id).subscribe(res => {
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
