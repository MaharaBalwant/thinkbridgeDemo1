
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { KanbanBoard } from './kanbanBoard/kanbanBoard.component';
import { ThinkbridgeComponent } from './thinkbridge/thinkbridge.component';
//Angular Router Module
import { RouterModule, Router } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoard,
    ThinkbridgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    RouterModule.forRoot([
      //{ path:'listing', component: KanbanBoard },
      { path:'', component: ThinkbridgeComponent }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
