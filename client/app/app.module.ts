import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import { AppComponent }   from './app.component';
import { TodosComponent } from "./components/todos.component";
import { TodoService } from "./services/todo.service";

@NgModule({
    declarations: [
        AppComponent,
        TodosComponent
    ],
    imports:      [
        BrowserModule,
        HttpModule
    ],
    providers: [ TodoService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
