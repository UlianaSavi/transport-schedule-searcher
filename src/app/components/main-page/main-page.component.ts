import { Component } from '@angular/core';
import { API_KEY } from 'src/app/constants';
import { ApiService } from 'src/app/services/api.service';
import { CitiesResponse, Direction, ISearchResponse, SearchFormProps } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private apiService: ApiService) { }

  public searchRes: ISearchResponse | null = null;
  public cities: CitiesResponse | null = null;

  getCities(props?: {direction: Direction, matchStr: string}) {
    this.apiService.getCities(props).subscribe((cities) => {
      this.cities = cities;
    });
  }

  public search(props: SearchFormProps) {
    console.log(props);
    const params = `?apikey=${API_KEY}&format=json&from=${props.from}&to=${props.to}&lang=ru_RU&date=${props.date}`
    // this.apiService.search(params).subscribe((data) => {
    //   console.log(data);
    //   this.searchRes = data;
    // });
  }
}
