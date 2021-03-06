import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { OutputComponent } from './components/output/output.component';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
