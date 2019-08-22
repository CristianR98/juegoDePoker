import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { JuegoService } from 'src/app/services/juego.service';
import { Carta } from 'src/app/Interface/carta';
import { Mano } from 'src/app/Interface/mano';

@Component({
  selector: 'app-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.css']
})
export class ManoComponent implements OnInit, OnChanges{

  @Input()cartas:Carta[]
  @Input()show:boolean
  @Input()claseCarta:string
  cartaSeleccionada:boolean = false
  // cartas:Carta[] = this.juego.manoJugador
  
  constructor(public juego:JuegoService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  seleccionarCarta(index:number) {
    if (!this.juego.yaCambiadas && this.claseCarta === 'jugador') {
      this.cartas[index].select = (this.cartas[index].select)?false:true
      this.juego.cartaSeleccionada(index)
    }
    // element.classList.toggle('select')
  }

}
