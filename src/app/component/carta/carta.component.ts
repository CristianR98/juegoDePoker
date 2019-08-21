import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Carta } from 'src/app/Interface/carta';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit, OnChanges {
  
  @Input()carta:Carta
  @Input()claseCarta:string
  @Input()show:boolean

  constructor(public juego:JuegoService) {
  }

  ngOnInit() {
  }
  ngOnChanges() {
  }


}
