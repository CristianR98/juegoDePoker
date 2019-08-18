import { Component } from '@angular/core';
import { JuegoService } from './services/juego.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poker';
  constructor(public juego:JuegoService) {
  }
}
