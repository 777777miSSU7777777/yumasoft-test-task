import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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
              private utilService: UtilService) { }

  ngOnInit() {
    if (!this.tableService.checkTablePresence()) {
        this.backToInput();
    } else {
      this._rows =  this.utilService.copyArray(this.tableService.rows);
      this._keys = this.utilService.parseKeys(this._rows);
      this._mode = 'r/o';
    }
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

  public onDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this._rows, event.previousIndex, event.currentIndex);
  }
}
