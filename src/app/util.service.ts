import { Injectable } from '@angular/core';
import matchAll from 'string.prototype.matchall';
import { ToastService } from './toast.service';
import { Papa, ParseResult } from 'ngx-papaparse';
import isEmpty from 'lodash-es/isEmpty';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  private readonly NOT_JSON_ARRAY_ERROR: string = 'JSON table data is not array';
  private readonly JSON_EMPTY_ARRAY_ERROR: string = 'JSON table data is empty';
  private readonly CSV_EMPTY_ARRAY_ERROR: string = 'CSV table data is empty';
  private readonly INCORRECT_TABLE_DATA_ERROR: string = 'Table data is incorrect';

  constructor(private toastService: ToastService,
              private csvParser: Papa) { }

  public copyArray(src: any[]): any[] {
    return JSON.parse(JSON.stringify(src));
  }

  public readFile(file: File): Promise<string> {
    return new Response(file).text();
  }

  public parseJSONArray(str: string): any[] {
    let tableData;
    try {
      tableData = JSON.parse(str);

      if (!Array.isArray(tableData)){
        this.toastService.showError(this.NOT_JSON_ARRAY_ERROR, 5);
        throw new Error("Not JSON array error");
      } else if (tableData.length === 0) {
        this.toastService.showError(this.JSON_EMPTY_ARRAY_ERROR, 5);
        throw new Error("Empty JSON array error");
      }

      return tableData;
    } catch (error) {
      return this.parseCustomJSONArray(str);
    }
  }

  private parseCustomJSONArray(str: string): any[] {
    const groups: Iterable<string> = matchAll(str, /([\w]+):/g);
        
    const keys: Set<string> = new Set<string>();

    for (let group of groups) {
      keys.add(group[1]);
    }

    for (let key of keys) {
      const reg = new RegExp(key, "g");
      str = str.replace(reg, (item) => `"${item}"`);
    }

    return JSON.parse(str);
  }

  public parseCSV(str: string): any[] {
    const result: ParseResult = this.csvParser.parse(str, { header: true });
    
    if (result.data.length === 0) {
      this.toastService.showError(this.CSV_EMPTY_ARRAY_ERROR, 5);
      throw new Error("CSV array is empty error");
    } else if (isEmpty(result.errors)) {
      return (result.data as any[]);
    } else {
      this.toastService.showError(this.INCORRECT_TABLE_DATA_ERROR, 5);
      throw new Error("Table data is incorrect error");
    }
  }

  public parseKeys(rows: any[]): string[] {
    const keySet: Set<string> = new Set<string>();

    for (let row of rows) {
      for (let key of Object.keys(row)) {
        keySet.add(key);
      }
    }

    const keys: string[] = [];
  
    for (let key of keySet) {
      keys.push(key);
    }

    return keys;
  }
 }