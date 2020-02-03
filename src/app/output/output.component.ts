import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {
  rawTableData: string;

  constructor(private router: Router, private tableService: TableService) { }

  ngOnInit() {
    this.rawTableData = JSON.stringify(this.tableService.rows)
  }

  backToEditor(): void {
    this.router.navigate(["/table"]);
  }
}
