import { Component, OnInit } from '@angular/core';
import {TablesControllerService, TablesDto} from '../../../api';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tables: TablesDto[];

  constructor(
    private tableService: TablesControllerService
  ) { }

  ngOnInit() {
    this.tableService.getAllUsingGET8().subscribe(
      tables => this.tables = tables.content
    );
  }

}
