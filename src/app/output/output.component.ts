import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {
  rawTableData: string;

  constructor(private router: Router,
              private tableService: TableService, 
              private toastService: ToastService) { }

  ngOnInit() {
    if (!this.tableService.rows) {
      this.toastService.show('You should load table data first!', { classname: 'bg-danger text-light', delay: 5000 });
      this.router.navigate(["/input"]);
      return;
    }
    this.rawTableData = JSON.stringify(this.tableService.rows)
  }

  backToEditor(): void {
    this.router.navigate(["/table"]);
  }
}
