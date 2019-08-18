import { Injectable } from '@angular/core';
import { Carta } from '../Interface/carta';
import { Observable, Subject } from 'rxjs';

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
  
  repartir(mano:Carta[]) {
    for (let i = 0; i < 5; i++) {
      mano.push(this.crearCarta())
      if (!this.generateManoJugador) {
        this.manoIA.push(this.cartasJuego[i])
      }
      else{
        this.manoJugador.push(this.cartasJuego[i+5])
      }
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
    this.mano$.next(this.manoJugador)
    console.log(this.yaCambiadas)
  }

  jugar() {
    this.jugada = true
  }


}
