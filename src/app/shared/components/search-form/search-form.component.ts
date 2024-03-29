import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MIN_SEARCH_LEN } from 'src/app/constants';
import { CitiesResponse, Direction, SearchFormProps, TransportType } from 'src/app/types';
import { getTomorrow } from 'src/app/utils';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Input() cities: CitiesResponse | null = null;
  @Output() getCitiesEvent = new EventEmitter<{direction: Direction, matchStr: string}>();
  @Output() searchEvent = new EventEmitter<SearchFormProps>();
  @ViewChild('date') dateInput: ElementRef | null = null;

  constructor(private renderer: Renderer2) { }

  private today = new Date().toISOString().slice(0, 10);
  private tomorrow = getTomorrow();

  public directionTypes = Direction;
  public listFromActive = false;

  public searchForm = new FormGroup({
    from: new FormControl('', Validators.required),
    fromCode: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    toCode: new FormControl('', Validators.required),
    transportType: new FormControl(TransportType.noneVal, Validators.required),
    date: new FormControl(String(this.today), Validators.required),
  });

  public getCities(type: Direction) {
    if (type === Direction.from
        && this.searchForm.value.from?.length
        && this.searchForm.value.from?.length >= MIN_SEARCH_LEN) {
      this.listFromActive = true;
      this.getCitiesEvent.emit({direction: Direction.from, matchStr: this.searchForm.value.from});
    } else if (type === Direction.to
        && this.searchForm.value.to?.length
        && this.searchForm.value.to?.length >= MIN_SEARCH_LEN){
      this.listFromActive = false;
      this.getCitiesEvent.emit({direction: Direction.to, matchStr: this.searchForm.value.to});
    }
  }

  public search() {
    const props: SearchFormProps = {
      from: this.searchForm.value.fromCode || '',
      to: this.searchForm.value.toCode  || '',
      transportType: this.searchForm.value.transportType  || TransportType.noneVal,
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
      this.searchForm.controls.transportType.setValue(TransportType.noneVal);
      return;
    }
    this.searchForm.controls.transportType.setValue(target?.value as TransportType);
  }

  public selectCity(type: Direction, cityCode: string, cityName: string) {
    if(cityName.length) {
      this.searchForm.controls[type].setValue(cityName);
      this.searchForm.controls[`${type}Code`].setValue(cityCode);
      this.cities = null;
    }
  }

  public switchFromToValues() {
    const to = this.searchForm.value.to;
    const from = this.searchForm.value.from;
    const fromCode = this.searchForm.value.fromCode;
    const toCode = this.searchForm.value.toCode;
    this.searchForm.controls.from.setValue(to || '');
    this.searchForm.controls.to.setValue(from || '');
    this.searchForm.controls.fromCode.setValue(toCode || '');
    this.searchForm.controls.toCode.setValue(fromCode || '');
  }
}
