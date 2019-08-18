import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';

@Component({
  selector: 'app-mano-rival',
  templateUrl: './mano-rival.component.html',
  styleUrls: ['./mano-rival.component.css']
})
export class ManoRivalComponent implements OnInit {

  cartas:Carta[] = []
  cartasOcultas:number[] = [0,0,0,0,0]
  hidden:boolean = true

  constructor(public juego:JuegoService) {
    this.juego.repartir(this.cartas)
  }

  ngOnInit() {
  }

}
