import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CitiesResponse, ISearchResponse } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private apiService: ApiService) { }

  public searchRes: ISearchResponse | null = null;
  public cities: CitiesResponse | null = null;

  public getCities() {
    this.apiService.getCities().subscribe((cities) => {
      console.log(cities);
      this.cities = cities;
    });
  }

  public search(props: unknown) {
    console.log(props);
    // this.apiService.search().subscribe((data) => {
    //   console.log(data);
    //   this.searchRes = data;
    // });
  }
}
