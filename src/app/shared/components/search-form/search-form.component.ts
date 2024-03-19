import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CitiesResponse, Direction, TransportType } from 'src/app/types';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Input() cities: CitiesResponse | null = null;
  @Output() newGetCitiesEvent = new EventEmitter<{direction: Direction, matchStr: string}>();
  @ViewChild('date') dateInput: ElementRef | null = null;

  public searchForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    transprtType: new FormControl(TransportType.bus),
    date: new FormControl(new Date()),
  });

  public getCities() {
    if (this.searchForm.value.from) {
      this.newGetCitiesEvent.emit({direction: Direction.from, matchStr: this.searchForm.value.from});
    }
    if (this.searchForm.value.to) {
      this.newGetCitiesEvent.emit({direction: Direction.to, matchStr: this.searchForm.value.to});
    }
  }

  public showPicker() {
    try {
      this.dateInput?.nativeElement.showPicker();
    } catch (error) {
      console.log(error);
    }
  }
}
