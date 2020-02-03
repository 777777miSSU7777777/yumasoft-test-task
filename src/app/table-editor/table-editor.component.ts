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
  private _rows: any[];
  private _keys: string[];
  private _mode: string;

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

    this._rows =  this.utilService.copyArray(this.tableService.rows);
    this.parseKeys();
    this._mode = 'r/o';
  }

  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }

  get keys(): string[] {
    return this._keys;
  }

  get mode(): string {
    return this._mode;
  }

  private parseKeys(): void {
    const keys: Set<string> = new Set<string>();

    for (let row of this.rows) {
      for (let key of Object.keys(row)) {
        keys.add(key);
      }
    }

    this._keys = [];

    for(let key of keys) {
      this._keys.push(key);
    }
  }

  public editMode(): void {
    this._mode = 'edit';
  }

  private roMode(): void {
    this._mode = 'r/o';
  }

  public exportTable(): void {
    this.router.navigate(['/output']);
  }

  public saveChanges(): void {
    this.tableService.rows = this.utilService.copyArray(this.rows);
    this.roMode();
  }

  public cancelChanges(): void {
    this.rows = this.utilService.copyArray(this.tableService.rows);
    this.roMode();
  }

  public backToInput(): void {
    this.router.navigate(['/input']);
  }

  public deleteRow(row: any): void {
    this._rows = this._rows.filter(r => r !== row);
  }

  public createNewRow(): void {
    const newRow = {};

    for (let prop of this.keys) {
      newRow[prop] = "";
    }

    this._rows.push(newRow);
  }
}
