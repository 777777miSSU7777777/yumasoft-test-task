import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {
  private _rawTableData: string;
  private _format: string;

  private readonly EMPTY_DATA_TABLE_ERROR: string = 'You should import table data first!';

  constructor(private router: Router,
              private tableService: TableService, 
              private toastService: ToastService,
              private parser: Papa) { }

  ngOnInit() {
    if (!this.tableService.rows) {
      this.toastService.showError(this.EMPTY_DATA_TABLE_ERROR, 5);
      this.backToInput();
      return;
    }

    this._format = 'json';
    this._rawTableData = JSON.stringify(this.tableService.rows)
  }

  get rawTableData(): string {
    return this._rawTableData;
  }
  
  set rawTableData(value: string) {
    this._rawTableData = value;
  }

  private backToInput(): void {
    this.router.navigate(['/input']);
  }

  public backToEditor(): void {
    this.router.navigate(["/table"]);
  }

  public switchFormat(): void {
    this._format = this._format == 'json' ? 'csv' : 'json';

    switch(this._format) {
      case 'json': this._rawTableData = JSON.stringify(this.tableService.rows); break;
      case 'csv' : this._rawTableData = this.parser.unparse(this.tableService.rows); break;
      default: ;
    }
  }

  public exportToFile(): void {
    const fileBlob: Blob = new Blob([this._rawTableData], { type: this._format == 'json' ? 'application/json' : 'text/plain' });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(fileBlob);
    link.setAttribute('download', `table.${this._format}`);
    link.click();
  }

  get switcherText(): string {
    return `Switch to ${this._format === 'json' ? 'CSV' : 'JSON'}`
  }
}
