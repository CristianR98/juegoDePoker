import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';
import { Mano } from 'src/app/Interface/mano';

@Component({
  selector: 'app-mano-rival',
  templateUrl: './mano-rival.component.html',
  styleUrls: ['./mano-rival.component.css']
})
export class ManoRivalComponent implements OnInit {

  cartas:Carta[] = this.juego.manoIA
  cartasOcultas:number[] = [0,0,0,0,0]
  hidden:boolean = true
  jugada:string = ''

  constructor(public juego:JuegoService) {
    this.juego.repartir()
    this.jugada = this.juego.mostrarJugadaIA
  }

  ngOnInit() {
    this.juego.getNuevaMano$().subscribe((e)=> {
      this.cartas = this.juego.manoIA
      this.jugada = this.juego.mostrarJugadaIA
    })
  }

}
