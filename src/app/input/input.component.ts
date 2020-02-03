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
  file: File;

  constructor(private router: Router, 
              private toastService: ToastService,
              private tableService: TableService,
              private parser: Papa) { }

  ngOnInit() {
    this.rawTableData = "";
    this.file = null;
  }

  importTable(rawTableData: string): void {
    if (rawTableData.length === 0) {
      this.toastService.show('Table data is empty', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }

    try {
      const tableData = JSON.parse(rawTableData);
      
      if (!Array.isArray(tableData)) {
        this.toastService.show('JSON table data is not array', { classname: 'bg-danger text-light', delay: 5000 });
        return;
      }

      this.tableService.rows = tableData;
      this.router.navigate(['/table']);
    } catch (error) {
        this.parser.parse(rawTableData, {
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

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
  }

  readFile(): Promise<string> {
    return new Response(this.file).text();
  }

  importFromInput(): void {
    this.importTable(this.rawTableData);
  }

  async importFromFile(): Promise<void> {
    if (!this.file) {
      this.toastService.show('There is no file', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }

    const fileTableData: string = await this.readFile();
    this.importTable(fileTableData);
  }

  getFileName(): string {
    return this.file && this.file.name || 'Choose file';
  }
}
