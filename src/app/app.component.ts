import {Component, Input, SimpleChange} from '@angular/core';
import {NgForm} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('collapsable',[
      state('opened', style({
        height: '*'
      })),
      state('closed', style({
        height: 0,
        padding: 0
      })),
      transition('opened <=> closed',[
        animate('0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      ])
    ]),
    trigger('buttonAnimated', [
      state('over', style({
        transform: 'scale(1.3) rotate(20deg)'
      })),
      state('out', style({
        transform: 'scale(1) rotate(0deg)'
      })),
      transition('out <=> over', [
        animate('0.3s cubic-bezier(0.645, 0.045, 0.355, 1)')
      ]),
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'Show Meteo';
  city = { value: 'Roma' };
  state = 'closed';
  statebtn = 'out';

  toggle(){
    this.state = this.state === 'opened' ? 'closed' : 'opened';
    this.title = this.state === 'opened' ?  'Close Meteo' : 'Show Meteo';
  }

  changeCity( form: NgForm){
    this.city = { value : form.value.city};
  }
}
