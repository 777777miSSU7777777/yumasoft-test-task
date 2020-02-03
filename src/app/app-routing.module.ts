import { NgModule, Output } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { OutputComponent } from './output/output.component';

const routes: Routes = [
  { path: 'input', component: InputComponent },
  { path: 'table', component: TableEditorComponent },
  { path: 'output', component: OutputComponent },
  { path: '', redirectTo: 'input', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
