import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Carta } from 'src/app/Interface/carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit, OnChanges {
  
  @Input()carta:Carta

  constructor() {
  }

  ngOnInit() {
  }
  ngOnChanges() {
  }


}
