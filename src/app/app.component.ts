import { Component } from '@angular/core';
import { routing } from './animations/routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routing]
})
export class AppComponent {
  title = 'memory-cards';
  constructor() {
  }
}
