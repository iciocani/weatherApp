import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LocationInfo } from '../models/locationInfo.model';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly apiKey: string = '73b6883b17c66ba649735f475bb116da';
  private readonly http: HttpClient = inject(HttpClient);


  getCityDetails(cityName: string): Observable<Array<LocationInfo>> {
    return this.http.get<Array<LocationInfo>>(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&appid=${this.apiKey}`);
  }

  getCityWeather(lat: number, lon: number): Observable<Weather> {
    return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  }


}
