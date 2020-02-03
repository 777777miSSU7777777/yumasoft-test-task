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
  private _rawTableData: string;
  private _file: File;

  constructor(private router: Router, 
              private toastService: ToastService,
              private tableService: TableService,
              private parser: Papa) { }

  ngOnInit() {
    this._rawTableData = "";
    this._file = null;
  }

  get rawTableData(): string {
    return this._rawTableData;
  }

  set rawTableData(value: string) {
    this._rawTableData = value;
  }

  private importTable(rawTableData: string): void {
    if (rawTableData.length === 0) {
      this.toastService.show('Table data is empty', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }

    try {
      const tableData = JSON.parse(rawTableData);

      if (!Array.isArray(tableData)) {
        this.toastService.show('JSON table data is not array', { classname: 'bg-danger text-light', delay: 5000 });
        return;
      } else if (tableData.length === 0) {
        this.toastService.show('JSON table data is empty', { classname: 'bg-danger text-light', delay: 5000 });
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

  public handleFileInput(files: FileList): void {
    this._file = files.item(0);
  }

  private readFile(): Promise<string> {
    return new Response(this._file).text();
  }

  public importFromInput(): void {
    this.importTable(this._rawTableData);
  }

  public async importFromFile(): Promise<void> {
    if (!this._file) {
      this.toastService.show('There is no file', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    } else if (!['application/json', 'application/vnd.ms-excel'].includes(this._file.type)) {
      this.toastService.show('Invalid file extension', { classname: 'bg-danger text-light', delay: 5000 });
      return;
    }

    const fileTableData: string = await this.readFile();
    this.importTable(fileTableData);
  }

  get fileName(): string {
    return this._file && this._file.name || 'Choose file';
  }
}
