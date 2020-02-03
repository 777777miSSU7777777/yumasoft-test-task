import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import isEmpty from 'lodash-es/isEmpty';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  rawTableData: string;

  constructor(private router: Router, 
              private toastService: ToastService,
              private tableService: TableService,
              private parser: Papa) { }

  ngOnInit() {
  }

  importTable(): void {
    try {
      const tableData = JSON.parse(this.rawTableData);
      if (!Array.isArray(tableData)) {
        this.toastService.show('JSON table data is not array', { classname: 'bg-danger text-light', delay: 5000 });
        return;
      }
      this.tableService.rows = tableData;
      this.router.navigate(['/table']);
    } catch (error) {
        this.parser.parse(this.rawTableData, {
          header: true,
          complete: (result) => {
            if (isEmpty(result.errors)) {
              this.tableService.rows = result.data;
              this.router.navigate(['/table']);
            } else {
              this.toastService.show('Table data is incorrect', { classname: 'bg-danger text-light', delay: 5000 });
            }
          }
        });
    }
  }
}
