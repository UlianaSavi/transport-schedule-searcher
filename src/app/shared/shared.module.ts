import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ListComponent } from './components/list/list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SearchFormComponent,
    ListComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SearchFormComponent,
    ListComponent],
})
export class SharedModule { }
