import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MesaComponent } from './component/mesa/mesa.component';
import { ManoComponent } from './component/mano/mano.component';

//Services
import { JuegoService } from './services/juego.service';
import { CartaComponent } from './component/carta/carta.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { APP_ROUTING } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    ManoComponent,
    CartaComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
