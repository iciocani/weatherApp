import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { WeatherService } from '../../core/services/weather.service';

describe('WeatherComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getCityDetails', 'getCityWeather']);

    TestBed.configureTestingModule({
      imports: [DashboardComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct icon for clear sky (weatherCode 0)', () => {
    const result = component.getWeatherIconOrText(0, 'icon');
    expect(result).toBe('☀️');
  });

  it('should return the correct text for clear sky (weatherCode 0)', () => {
    const result = component.getWeatherIconOrText(0, 'text');
    expect(result).toBe('Clear sky');
  });
});
