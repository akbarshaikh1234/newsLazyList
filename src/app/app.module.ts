import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsCardsComponent } from './news-cards/news-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewslistService } from './service/newslist.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalInsertComponent } from './modal-insert/modal-insert.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import { MaterialModule } from './shared/material.module';
@NgModule({
  declarations: [
    AppComponent,
    NewsCardsComponent,
    ModalInsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    MaterialModule
  ],
  providers: [NewslistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
