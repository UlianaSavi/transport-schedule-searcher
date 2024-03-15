import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ListComponent } from './components/list/list.component';



@NgModule({
  declarations: [
    SearchFormComponent,
    ListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SearchFormComponent,
    ListComponent],
})
export class SharedModule { }
