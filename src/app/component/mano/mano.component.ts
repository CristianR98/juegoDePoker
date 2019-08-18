import { Component, OnInit, OnChanges, Output } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css']
})
export class ManoComponent implements OnInit, OnChanges{

  cartas:Carta[] = []
  
  constructor(public juego:JuegoService) {
    this.juego.repartir(this.cartas)
    console.log(this.cartas)
  }

  ngOnInit() {
    this.juego.getNuevaMano$().subscribe(()=>{
      this.cartas = this.juego.manoJugador
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
