import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  private _rawTableData: string;
  private _file: File;

  constructor(private router: Router, 
              private tableService: TableService) { }

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

  public handleFileInput(files: FileList): void {
    this._file = files.item(0);
  }

  public importFromInput(): void {
    if (this.tableService.importTable(this._rawTableData)) {
      this.toTable();
    };
  }

  public async importFromFile(): Promise<void> {
    const str: string = await this.tableService.importFile(this._file);

    if (this.tableService.importTable(str)) {
      this.toTable();
    };
  }

  get fileName(): string {
    return this._file && this._file.name || 'Choose file';
  }
}
