import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CitiesResponse, Direction, SearchFormProps, TransportType } from 'src/app/types';
import { getTomorrow } from 'src/app/utils';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Input() cities: CitiesResponse | null = null;
  @Output() getCitiesEvent = new EventEmitter<{direction: Direction, matchStr: string}>();
  @Output() searchEvent = new EventEmitter<SearchFormProps>();
  @ViewChild('date') dateInput: ElementRef | null = null;

  constructor(private renderer: Renderer2) { }

  private today = new Date().toISOString().slice(0, 10);
  private tomorrow = getTomorrow();

  public searchForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    transportType: new FormControl(TransportType.none, Validators.required),
    date: new FormControl(String(this.today), Validators.required),
  });

  ngOnInit() {
    // this.searchForm.controls.date.valueChanges.subscribe((item) =>{
    //   console.log(item);
    // })
  }

  public getCities() {
    if (this.searchForm.value.from) {
      this.getCitiesEvent.emit({direction: Direction.from, matchStr: this.searchForm.value.from});
    }
    if (this.searchForm.value.to) {
      this.getCitiesEvent.emit({direction: Direction.to, matchStr: this.searchForm.value.to});
    }
  }

  public search() {
    const props: SearchFormProps = {
      from: this.searchForm.value.from || '',
      to: this.searchForm.value.to  || '',
      transportType: this.searchForm.value.transportType  || TransportType.bus,
      date: this.searchForm.value.date  || String(this.today),
    }
    this.searchEvent.emit(props);
  }

  public showPicker() {
    try {
      this.dateInput?.nativeElement.showPicker();
    } catch (error) {
      console.log(error);
    }
  }

  public selectDate(e: Event) {
    const target = (e.target as HTMLInputElement);

    if (target.className === 'date date-input') {
      target.parentElement?.parentElement?.childNodes?.forEach((item) => {
        this.renderer.removeClass(item, 'active');
      });
      this.renderer.addClass(target.parentElement, 'active')
    } else {
      target.parentElement?.childNodes?.forEach((item) => {
        this.renderer.removeClass(item, 'active');
      });
      this.renderer.addClass(target, 'active')
    }


    switch (target.value) {
      case 'Сегодня':
        this.searchForm.controls.date.setValue(this.today);
        break;
      case 'Завтра':
        this.searchForm.controls.date.setValue(this.tomorrow);
        break;
      default:
      this.searchForm.controls.date.setValue(target.value);
    }
    console.log(this.searchForm.controls.date.value);
  }

  public selectTransportType(e: Event) {
    const target = (e.target as HTMLButtonElement).className === 'img'
      ? (e.target as HTMLButtonElement).parentElement as HTMLButtonElement
      : (e.target as HTMLButtonElement);
    target.parentElement?.childNodes?.forEach((item) => {
      this.renderer.removeClass(item, 'active');
    });
    this.renderer.addClass(target, 'active');
    if (target?.value === TransportType.none) {
      return;
    }
    this.searchForm.controls.transportType.setValue(target?.value as TransportType);
  }
}
