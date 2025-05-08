import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../../core/models/user';
import { DataTableConfig } from '../../../core/models/data-table-config.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Input for table data
  @Input({ required: true }) tableData = new DataTableConfig({
		Data: [],
		PageSourceName: '',
		Columns: []
	});

  // Variables
  columns: string[] = [];
  dataSource = new MatTableDataSource<User>();
  filterControl = new FormControl<string>('', { nonNullable: true });


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData.Data);
    this.columns = this.tableData.Columns;
    this.dataSource.sort = this.sort;

    this.filterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.applyFilter(value));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
