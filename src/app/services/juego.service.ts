import { Injectable } from '@angular/core';
import { Carta } from '../Interface/carta';
import { Observable, Subject } from 'rxjs';
import { Mano } from '../Interface/mano';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  cartasJuego:Carta[] = []
  generateManoJugador:boolean = false
  manoIA:Carta[] = []
  manoJugador:Carta[] = []
  cartasACambiar:Carta[] = []
  cambiarCartasBtn:boolean = false
  yaCambiadas:boolean = false
  jugada:boolean = false
  jugadaJugador:Mano
  jugadaIA:Mano
  mostrarJugadaJugador:string
  mostrarJugadaIA:string
  ganador:string
  private mano$ = new Subject<Carta[]>();

  constructor() {
    
  }

  private crearCarta = () => {
    let carta = new Carta(),
        repetida = []
    for (let j = 0; j < this.cartasJuego.length; j++) {
      if (carta.valor == this.cartasJuego[j].valor && carta.palo == this.cartasJuego[j].palo) {
          repetida.push(true)
      } else {
          repetida.push(false)
      }
  }
    if (repetida.indexOf(true) > -1) {
        return this.crearCarta()
    } else {
        this.cartasJuego.push(carta)
        return carta
    }
}
  
  repartir() {
    for (let i = 0; i < 5; i++) {
      if (!this.generateManoJugador) {
        this.manoIA.push(this.crearCarta())
      }
      else{
        this.manoJugador.push(this.crearCarta())
      }
    }if (!this.generateManoJugador) {
      this.jugadaIA = new Mano(this.manoIA)
      this.mostrarJugadaIA = this.jugadaIA.getJugada()
    }else{
      this.jugadaJugador = new Mano(this.manoJugador)
      this.mostrarJugadaJugador = this.jugadaJugador.getJugada()
    }
    this.generateManoJugador = true
}

  cartaSeleccionada(index:number) {
    let existe = this.cartasACambiar.indexOf(this.cartasJuego[index+5])
    if (existe > -1) {
      this.cartasACambiar.splice(existe,1)
    }
    else {
      this.cartasACambiar.push(this.cartasJuego[index+5])
    }
    if (this.cartasACambiar.length >= 1) {
      this.cambiarCartasBtn = true
    }else{
      this.cambiarCartasBtn = false
    }
  }

  getNuevaMano$():Observable<Carta[]> {
    return this.mano$.asObservable()
  }

  cambiarMano(){
    for(let i = 0; i < this.cartasACambiar.length; i++) {
      let index = this.manoJugador.indexOf(this.cartasACambiar[i])
      this.manoJugador.splice(index,1,this.crearCarta())
    }
    this.cartasACambiar = []
    this.cambiarCartasBtn = false
    this.yaCambiadas = true
    this.jugadaJugador = new Mano(this.manoJugador)
    this.mostrarJugadaJugador = this.jugadaJugador.getJugada()
    this.mano$.next(this.manoJugador)
  }

  jugar() {
    this.jugada = true
    this.jugadaJugador = new Mano(this.manoJugador)
    this.jugadaIA = new Mano(this.manoIA)
    this.jugadaJugador.getJugada(),
    this.jugadaIA.getJugada()
    let cartasIgualesJugador = this.jugadaJugador.cartasIgual,
        cartasIgualesIA = this.jugadaIA.cartasIgual,
        cartaMayorJugador = Math.max(...cartasIgualesJugador),
        cartaMayorIA = Math.max(...cartasIgualesIA),
        cartaMenorJugador = Math.min(...cartasIgualesJugador),
        cartaMenorIA = Math.min(...cartasIgualesIA)
    if( this.jugadaJugador.nivelJugada > this.jugadaIA.nivelJugada ) {
      this.ganador = 'Ganaste!'
    }else if (this.jugadaJugador.nivelJugada < this.jugadaIA.nivelJugada){
      this.ganador = 'Ganó IA U.U'
    }
    else if (cartaMayorJugador > cartaMayorIA) {
          this.ganador = 'Ganaste!'
        }
    else if (cartaMayorJugador < cartaMayorIA){
      this.ganador = 'Ganó IA U.U'
    }else if (cartaMenorJugador < cartaMenorIA){
      this.ganador = 'Ganaste!'
    }else if (cartaMenorJugador < cartaMenorIA){
      this.ganador = 'Ganó IA U.U'
    }
      
    else{
      if (this.jugadaJugador.cartaAlta.valor > this.jugadaIA.cartaAlta.valor) {
        this.ganador = 'Ganaste!'
      }else {
        this.ganador = 'Ganó IA U.U'
      }
    }
  }
  jugarDeNuevo() {
    this.cartasJuego = []
    this.manoJugador = []
    this.manoIA = []
    this.cartasACambiar = []
    this.jugada = false
    this.yaCambiadas = false
    this.cambiarCartasBtn = false
    this.generateManoJugador = false
    this.mano$.next(this.manoJugador)
    this.repartir()
    this.repartir()
    this.mano$.next(this.manoJugador)
    this.mano$.next(this.manoIA)
  }

}
