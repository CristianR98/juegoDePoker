import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit { 

  cartasIA:Carta[] = this.juego.cartasIA
  cartasJugador:Carta[] = this.juego.cartasJugador
  jugadaIA:string
  jugadaJugador:string
  claseJugador:string = 'jugador'
  claseIA:string = 'IA'

  constructor(public juego:JuegoService) {
  }

  ngOnInit() {
    if (!this.juego.partida) {
      this.juego.jugarDeNuevo()
      this.cartasIA = this.juego.cartasIA
      this.cartasJugador = this.juego.cartasJugador
      this.jugadaIA = this.juego.JugadaIA
      this.jugadaJugador = this.juego.JugadaJugador
      this.juego.partida = true
    }
    this.juego.getNuevaMano$().subscribe(()=>{
      this.cartasIA = this.juego.cartasIA
      this.jugadaIA = this.juego.JugadaIA
      this.jugadaJugador = this.juego.JugadaJugador
      this.cartasJugador = this.juego.cartasJugador
    })
  }

}
