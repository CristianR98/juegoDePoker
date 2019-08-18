import { Component, OnInit, OnChanges } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit, OnChanges { 

  

  constructor(public juego:JuegoService) { 
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('hola')
  }


}
