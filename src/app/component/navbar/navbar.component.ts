import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuDesplegado:boolean = false

  constructor() { }

  ngOnInit() {
  }
  toggleMenu() {
    this.menuDesplegado = (this.menuDesplegado)?false:true
  }
}
