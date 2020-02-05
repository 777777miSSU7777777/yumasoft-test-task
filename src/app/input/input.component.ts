import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import isEmpty from 'lodash-es/isEmpty';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  private _rawTableData: string;
  private _file: File;

  private readonly EMPTY_ERROR: string = 'Table data is empty';
  private readonly NOT_JSON_ARRAY_ERROR: string = 'JSON table data is not array';
  private readonly JSON_EMPTY_ARRAY_ERROR: string = 'JSON table data is empty';
  private readonly CSV_EMPTY_ARRAY_ERROR: string = 'CSV table data is empty';
  private readonly INCORRECT_TABLE_DATA_ERROR: string = 'Table data is incorrect';
  private readonly NO_FILE_ERROR: string = 'There is no file';
  private readonly INVALID_FILE_EXTENSION_ERROR: string = 'Invalid file extension';

  constructor(private router: Router, 
              private toastService: ToastService,
              private tableService: TableService,
              private utilService: UtilService,
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

  private toTable(): void {
    this.router.navigate(['/table']);
  }

  private importTable(rawTableData: string): void {
    if (rawTableData.length === 0) {
      this.toastService.showError(this.EMPTY_ERROR, 5);
      return;
    }

    let tableData: any[];

    try {
      tableData = JSON.parse(rawTableData);

      if (!Array.isArray(tableData)) {
        this.toastService.showError(this.NOT_JSON_ARRAY_ERROR, 5);
        return;
      } else if (tableData.length === 0) {
        this.toastService.showError(this.JSON_EMPTY_ARRAY_ERROR, 5);
        return;
      }

      this.tableService.rows = tableData;
      this.toTable();
    } catch {
      try {
        tableData = this.utilService.parseCustomJSON(rawTableData);

        if (!Array.isArray(tableData)) {
          this.toastService.showError(this.NOT_JSON_ARRAY_ERROR, 5);
          return;
        } else if (tableData.length === 0) {
          this.toastService.showError(this.JSON_EMPTY_ARRAY_ERROR, 5);
          return;
        }
  
        this.tableService.rows = tableData;
        this.toTable();
      } catch {
        this.parser.parse(rawTableData, {
          header: true,
          complete: (result) => {
            if (result.data.length === 0) {
              this.toastService.showError(this.CSV_EMPTY_ARRAY_ERROR, 5);
              return;
            } else if (isEmpty(result.errors)) {
              this.tableService.rows = result.data;
              this.toTable();
            } else {
              this.toastService.showError(this.INCORRECT_TABLE_DATA_ERROR, 5);
            }
          }
        });
      }
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
      this.toastService.showError(this.NO_FILE_ERROR, 5);
      return;
    } else if (!['application/json', 'application/vnd.ms-excel'].includes(this._file.type)) {
      this.toastService.showError(this.INVALID_FILE_EXTENSION_ERROR, 5);
      return;
    }

    const fileTableData: string = await this.readFile();
    this.importTable(fileTableData);
  }

  get fileName(): string {
    return this._file && this._file.name || 'Choose file';
  }
}
