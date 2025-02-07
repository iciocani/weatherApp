import { WeatherUnits } from './weather-units.model';
import { CurrentWeather } from './current-weather.model';

export interface Weather {
  latitude: number;
  longitude: number;
  generationTimeMs: number;
  utcOffsetSeconds: number;
  timezone: string;
  timezoneAbbreviation: string;
  elevation: number;
  current_weather_units: WeatherUnits;
  current_weather: CurrentWeather;
}
