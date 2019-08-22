import { Injectable } from '@angular/core';
import { Carta } from '../Interface/carta';
import { Observable, Subject } from 'rxjs';
import { Mano } from '../Interface/mano';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private cartasJuego:Carta[] = []
  private repartirJugador:boolean = false
  private cartasACambiar:Carta[] = []
  private perdiste:string = 'Perdiste u.u'
  private ganaste:string = 'Ganaste!'
  private mano$ = new Subject<Carta[]>();
  private jugar$ = new Subject<boolean>();

  public cartasIA:Carta[] = []
  public cartasJugador:Carta[] = []
  public cambiarCartasBtn:boolean = false
  public yaCambiadas:boolean = false
  public jugada:boolean = false
  public manoJugador:Mano
  public manoIA:Mano
  public JugadaJugador:string
  public JugadaIA:string
  public resultado:string
  public partida:boolean = false

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
  
  private repartir() {
    for (let i = 0; i < 5; i++) {
      if (!this.repartirJugador) {
        this.cartasIA.push(this.crearCarta())
      }
      else{
        this.cartasJugador.push(this.crearCarta())
      }
    }if (!this.repartirJugador) {
      this.manoIA = new Mano(this.cartasIA)
      this.JugadaIA = this.manoIA.getJugada()
      this.repartirJugador = true
      this.repartir()
    }else{
      this.manoJugador = new Mano(this.cartasJugador)
      this.JugadaJugador = this.manoJugador.getJugada()
    }
}

  public cartaSeleccionada(index:number) {
    let existe = this.cartasACambiar.indexOf(this.cartasJugador[index])
    if (existe > -1) {
      this.cartasACambiar.splice(existe,1)
    }
    else {
      this.cartasACambiar.push(this.cartasJugador[index])
    }
    if (this.cartasACambiar.length >= 1) {
      this.cambiarCartasBtn = true
    }else{
      this.cambiarCartasBtn = false
    }
  }

  
  public cambiarMano(){
    for(let i = 0; i < this.cartasACambiar.length; i++) {
      let index = this.cartasJugador.indexOf(this.cartasACambiar[i])
      this.cartasJugador.splice(index,1,this.crearCarta())
    }
    this.cartasACambiar = []
    this.cambiarCartasBtn = false
    this.yaCambiadas = true
    this.manoJugador = new Mano(this.cartasJugador)
    this.JugadaJugador = this.manoJugador.getJugada()
    this.mano$.next(this.cartasJugador)
  }

  //evaluar las jugadas
  public jugar() {
    this.jugada = true
    this.partida = false
    this.jugar$.next(this.jugada)
    this.manoJugador = new Mano(this.cartasJugador)
    this.manoIA = new Mano(this.cartasIA)
    this.manoJugador.getJugada(),
    this.manoIA.getJugada()
    let cartasIgualesJugador = this.manoJugador.cartasIgual,
        cartasIgualesIA = this.manoIA.cartasIgual,
        cartaMayorJugador = Math.max(...cartasIgualesJugador),
        cartaMayorIA = Math.max(...cartasIgualesIA),
        cartaMenorJugador = Math.min(...cartasIgualesJugador),
        cartaMenorIA = Math.min(...cartasIgualesIA)
    if( this.manoJugador.nivelJugada > this.manoIA.nivelJugada ) {
      this.resultado = this.ganaste
    }else if (this.manoJugador.nivelJugada < this.manoIA.nivelJugada){
      this.resultado = this.perdiste
    }
    else if (cartaMayorJugador > cartaMayorIA) {
          this.resultado = this.ganaste
        }
    else if (cartaMayorJugador < cartaMayorIA){
      this.resultado = this.perdiste
    }else if (cartaMenorJugador < cartaMenorIA){
      this.resultado = this.ganaste
    }else if (cartaMenorJugador < cartaMenorIA){
      this.resultado = this.perdiste
    }
      
    else{
      if (this.manoJugador.cartaAlta.valor > this.manoIA.cartaAlta.valor) {
        this.resultado = this.ganaste
      }else {
        this.resultado = this.perdiste
      }
    }
  }

  //Reset
  jugarDeNuevo() {
    this.partida = true
    this.cartasJuego = []
    this.cartasJugador = []
    this.cartasIA = []
    this.cartasACambiar = []
    this.jugada = false
    this.yaCambiadas = false
    this.cambiarCartasBtn = false
    this.repartirJugador = false
    this.repartir()
    this.mano$.next(this.cartasJugador)
  }

  //Observables
  getNuevaMano$():Observable<Carta[]> {
    return this.mano$.asObservable()
  }

  getJugada$():Observable<boolean> {
    return this.jugar$.asObservable()
  }

}
