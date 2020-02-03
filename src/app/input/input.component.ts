import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { TableService } from '../table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  rawTableData: string;

  constructor(private router: Router, public toastService: ToastService, public tableService: TableService) { }

  ngOnInit() {
  }

  loadTable(): void {
    try {
      const tableData = JSON.parse(this.rawTableData);
      if (!Array.isArray(tableData)) {
        this.toastService.show('JSON table data is not array', { classname: 'bg-danger text-light', delay: 5000 });
        return;
      }
      this.tableService.rows = tableData;
      this.router.navigate(['/table']);
    } catch (error) {
      console.error(error);
      this.toastService.show('JSON table data is incorrect', { classname: 'bg-danger text-light', delay: 5000 });
    }
  }
}
