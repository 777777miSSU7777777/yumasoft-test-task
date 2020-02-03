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
  rawTableData: string;
  format: string;

  constructor(private router: Router,
              private tableService: TableService, 
              private toastService: ToastService,
              private parser: Papa) { }

  ngOnInit() {
    if (!this.tableService.rows) {
      this.toastService.show('You should load table data first!', { classname: 'bg-danger text-light', delay: 5000 });
      this.router.navigate(["/input"]);
      return;
    }

    this.format = 'json';
    this.rawTableData = JSON.stringify(this.tableService.rows)
  }

  backToEditor(): void {
    this.router.navigate(["/table"]);
  }

  switchFormat(): void {
    this.format = this.format == 'json' ? 'csv' : 'json';

    switch(this.format) {
      case 'json': this.rawTableData = JSON.stringify(this.tableService.rows); break;
      case 'csv' : this.rawTableData = this.parser.unparse(this.tableService.rows); break;
      default: ;
    }
  }

  exportToFile(): void {
    const fileBlob = new Blob([this.rawTableData], { type: this.format == 'json' ? 'application/json' : 'text/plain' });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(fileBlob);
    link.setAttribute('download', `table.${this.format}`);
    link.click();
  }

  get switcherText(): string {
    return `Switch to ${this.format === 'json' ? 'CSV' : 'JSON'}`
  }
}
