import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TableService {
  private _rows: any[];

  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }

  constructor() { }
}
