import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from '../../core/services/weather.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, of, Subscription, switchMap } from 'rxjs';
import { Weather } from '../../core/models/weather.model';
import { LocationInfo } from '../../core/models/locationInfo.model';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly weatherService = inject(WeatherService);
  private subscription: Subscription = new Subscription();
  cityControl = new FormControl();
  cityDisplayName = '';
  errorMessage = '';
  weatherData: Weather | undefined;



  ngOnInit() {
    this.getCurrentWeather()
  }

  getCurrentWeather(): void {
    this.subscription = this.cityControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((cityName: string) => {
          this.errorMessage = 'No city Found for the given name';
          if (cityName.trim()) {
            return this.weatherService.getCityDetails(cityName);
          }
          return of();
        })
      )
      .subscribe({
        next: (data: Array<LocationInfo>): void => {
          if (data && data.length > 0) {
            this.cityDisplayName = data[0].display_name;
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            this.weatherService.getCityWeather(lat, lon).subscribe({
              next: (weatherData: Weather) => {
                this.weatherData = weatherData;
              },
              error: (err: HttpErrorResponse) => {
                console.log(err)
              }
            });
          } else {
            this.errorMessage = 'City not found.';
          }
        },
        error: (err: HttpErrorResponse): void => {
          this.errorMessage = err.message || 'An error occurred';
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getWeatherIconOrText(weatherCode: number, returnType: 'icon' | 'text'): string {
    switch (true) {
      case weatherCode === 0:
        return returnType === 'icon' ? '☀️' : 'Clear sky';
      case weatherCode >= 1 && weatherCode <= 3:
        return returnType === 'icon' ? '⛅' : 'Partly cloudy';
      case weatherCode === 45 || weatherCode === 48:
        return returnType === 'icon' ? '🌫' : 'Fog';
      case weatherCode >= 51 && weatherCode <= 57:
        return returnType === 'icon' ? '🌧' : 'Drizzle';
      case weatherCode >= 61 && weatherCode <= 67:
        return returnType === 'icon' ? '🌧' : 'Rain';
      case weatherCode >= 71 && weatherCode <= 77:
        return returnType === 'icon' ? '❄️' : 'Snowfall';
      case weatherCode >= 80 && weatherCode <= 82:
        return returnType === 'icon' ? '🌦' : 'Showers';
      default:
        return returnType === 'icon' ? '🌡' : 'Unknown weather';
    }
  }
}
