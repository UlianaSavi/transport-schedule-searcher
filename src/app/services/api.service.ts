import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitiesResponse, Direction, ISearchResponse } from '../types';
import { API_SEARCH_URL, API_CITIES_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public search(params: string): Observable<ISearchResponse> {
    // https://t.rasp.yandex.ru/search/train/
    return this.http.get<ISearchResponse>(`${API_SEARCH_URL}/${params}`);
  }

  public getCities(props?: {direction: Direction, matchStr: string}) {
    if (props) {
      return this.http.get<CitiesResponse>(`${API_CITIES_URL}&part=${props.matchStr}&field=${props.direction}`);
    }
    return this.http.get<CitiesResponse>(API_CITIES_URL);
  }
}
