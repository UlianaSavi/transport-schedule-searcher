import { Component, Input } from '@angular/core';
import { ISearchData } from 'src/app/types';
import { changeDate } from 'src/app/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() searchRes: ISearchData[] = [];

  public Math = Math;
  public changeDate = changeDate;
}
