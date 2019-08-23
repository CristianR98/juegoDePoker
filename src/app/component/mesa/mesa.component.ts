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
    console.log(this.juego.partida)
    if (!this.juego.partida) {
      this.juego.jugarDeNuevo()
    }
    this.juego.partida = true
    console.log(this.juego.partida)
    this.actualizarCartas()
    this.juego.getNuevaMano$().subscribe(()=>{
      this.actualizarCartas()
    })
  }

  private actualizarCartas():void {
    this.cartasIA = this.juego.cartasIA
    this.cartasJugador = this.juego.cartasJugador
    this.jugadaIA = this.juego.JugadaIA
    this.jugadaJugador = this.juego.JugadaJugador
  }

}
