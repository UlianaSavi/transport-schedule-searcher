import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitiesResponse, ISearchResponse } from '../types';
import { API_SEARCH_URL, API_CITIES_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public search(params: string): Observable<ISearchResponse> {
    return this.http.get<ISearchResponse>(`${API_SEARCH_URL}?${params}`);
  }

  public getCities(matchStr?: string) {
    if (matchStr) {
      return this.http.get<CitiesResponse>(`${API_CITIES_URL}&part=${matchStr}`);
    }
    return this.http.get<CitiesResponse>(API_CITIES_URL);
  }
}
