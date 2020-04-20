import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-meteo',
  animations: [
    trigger('imgAnimation', [
      state('over', style({
        transform: 'scale(2) rotate(0deg)'
      })),
      state('out', style({
        transform: 'scale(1) rotate(0deg)'
      })),
      transition('out <=> over', [
        animate('0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)')
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})

export class MeteoComponent implements OnChanges {

  @Input() city: any;
  weather: any;
  description: string;
  src: any;
  stateImg = 'out';


  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const APP_TOKEN = '75c820f8630ffd51e18f9ed9ffd46cf5';
    const city = changes.city;
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    if (city) {
      this.http.get(url + `${city.currentValue.value}&units=metric&APPID=${APP_TOKEN}`).subscribe(res => {
        this.weather = res;
        this.cd.markForCheck();
        this.description = this.weather.weather[0].description;
        this.changeIcon(this.description);
      });
    }
  }

  private changeIcon(description: string) {
    if (description.indexOf('clouds') > -1) {
      this.src = '../../assets/nuvola-immagine-animata-0007.gif';
    } else if (description.indexOf('sun') > -1 || description.indexOf('clear sky') > -1) {
      this.src = '../../assets/sole9.gif';
    } else {
      this.src = '../../assets/nuvola-immagine-animata-0010.gif';
    }
  }
}


