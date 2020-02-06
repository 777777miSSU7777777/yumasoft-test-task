import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { UtilService } from './util.service';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})

export class TableService {
  private readonly EMPTY_ERROR: string = 'Table data is empty';
  private readonly EMPTY_DATA_TABLE_ERROR: string = 'You should import table data first!';
  private readonly NO_FILE_ERROR: string = 'There is no file';
  private readonly INVALID_FILE_EXTENSION_ERROR: string = 'Invalid file extension';
  private readonly INCORRECT_TABLE_DATA_ERROR: string = 'Table data is incorrect';

  private _rows: any[];

  constructor(private toastService: ToastService,
              private utilService: UtilService) { }

  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }

  public async importFile(file: File): Promise<string> {
    if (!file) {
      this.toastService.showError(this.NO_FILE_ERROR, 5);
      throw new Error("No file error");
    } else if (!['application/json', 'application/vnd.ms-excel'].includes(file.type)) {
      this.toastService.showError(this.INVALID_FILE_EXTENSION_ERROR, 5);
      throw new Error("Invalid file extension error");
    }

    return await this.utilService.readFile(file)
  }

  public importTable(str: string): boolean {
    if (str.length === 0) {
      this.toastService.showError(this.EMPTY_ERROR, 5);
      return false;
    } else if (str.match(/(^[\d]+)/)) {
      this.toastService.showError(this.INCORRECT_TABLE_DATA_ERROR, 5);
      return false;
    }

    try {
      this._rows = this.utilService.parseJSONArray(str);
      return true;
    } catch (error) {
      try {
        this._rows = this.utilService.parseCSV(str);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  public checkTablePresence(): boolean {
    if (this._rows) {
      return true;
    }
    this.toastService.showError(this.EMPTY_DATA_TABLE_ERROR, 5);
    return false;
  }
}
