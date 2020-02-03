import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { RouterModule } from '@angular/router';
import { OutputComponent } from './output/output.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ToastsContainerComponent,
    TableEditorComponent,
    OutputComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'input', component: InputComponent },
      { path: 'table', component: TableEditorComponent },
      { path: 'output', component: OutputComponent },
      { path: '', redirectTo: '/input', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
