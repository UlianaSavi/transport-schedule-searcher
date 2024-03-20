import { Component } from '@angular/core';
import { API_KEY } from 'src/app/constants';
import { ApiService } from 'src/app/services/api.service';
import { CitiesResponse,
  Direction,
  ISearchData,
  ISearchResponse,
  SearchFormProps,
  TransportType } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private apiService: ApiService) { }

  public searchRes: ISearchData[] = [];
  public cities: CitiesResponse | null = null;
  public isLoading = false;

  getCities(props?: {direction: Direction, matchStr: string}) {
    this.apiService.getCities(props).subscribe((cities) => {
      this.cities = cities;
    });
  }

  public search(props: SearchFormProps) {
    this.isLoading = true;
    let params = '';
    if (props.transportType !== TransportType.noneVal) {
      params = `?apikey=${API_KEY}&from=${props.from}&to=${props.to}&transport_types=${props.transportType}&lang=ru_RU&date=${props.date}`
    } else {
      params = `?apikey=${API_KEY}&format=json&from=${props.from}&to=${props.to}&lang=ru_RU&date=${props.date}`
    }
    this.apiService.search(params).subscribe((data: ISearchResponse) => {
      this.searchRes = data.segments;
      this.isLoading = false;
    });
  }
}
