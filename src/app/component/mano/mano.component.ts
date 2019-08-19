import { Component, OnInit, OnChanges, Output } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';
import { Mano } from 'src/app/Interface/mano';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css']
})
export class ManoComponent implements OnInit, OnChanges{

  cartas:Carta[] = this.juego.manoJugador
  jugada:string = ''
  
  constructor(public juego:JuegoService) {
    this.juego.repartir()
    this.jugada = this.juego.mostrarJugadaJugador
  }

  ngOnInit() {
    this.juego.getNuevaMano$().subscribe(()=>{
      this.cartas = this.juego.manoJugador
      this.jugada = this.juego.mostrarJugadaJugador
      console.log(this.cartas)
    })
  }

  ngOnChanges() {
  }

  seleccionarCarta(element:HTMLElement,index:number) {
    if (!this.juego.yaCambiadas) {
      element.children[index].classList.toggle('select')
      this.juego.cartaSeleccionada(index)
    }
    // element.classList.toggle('select')
  }

}
