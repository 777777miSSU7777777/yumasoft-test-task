import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.css'],
})

export class TableEditorComponent implements OnInit {
  rows: any[];
  keys: string[];
  mode: string;

  constructor(private router: Router,
              private tableService: TableService, 
              private utilService: UtilService, 
              private toastService: ToastService) { }

  ngOnInit() {
    if (!this.tableService.rows) {
      this.toastService.show('You should load table data first!', { classname: 'bg-danger text-light', delay: 5000 });
      this.router.navigate(["/input"]);
      return;
    }
    this.rows =  this.utilService.copyArray(this.tableService.rows);
    this.parseKeys();
    this.mode = 'readonly';
  }

  getColsNames(): string[] {
    return this.keys;
  }

  parseKeys(): void {
    const keys: Set<string> = new Set<string>();
    for (let row of this.rows) {
      for (let key of Object.keys(row)) {
        keys.add(key);
      }
    }

    this.keys = [];
    for(let key of keys) {
      this.keys.push(key);
    }
  }

  toggleMode(): void {
    this.mode = this.mode === 'readonly' ? 'edit' : 'readonly';
  }

  exportTable(): void {
    this.router.navigate(["/output"]);
  }

  saveChanges(): void {
    this.tableService.rows = this.utilService.copyArray(this.rows);
    this.toggleMode();
  }

  cancelChanges(): void {
    this.rows = this.utilService.copyArray(this.tableService.rows);
    this.toggleMode();
  }

  backToInput(): void {
    this.router.navigate(["/input"]);
  }

  deleteRow(row: any): void {
    this.rows = this.rows.filter(r => r !== row);
  }

  createNewRow(): void {
    const newRow = {};
    for (let prop of this.keys) {
      newRow[prop] = "";
    }
    this.rows.push(newRow);
  }
}
