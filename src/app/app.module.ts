import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MesaComponent } from './component/mesa/mesa.component';
import { ManoComponent } from './component/mano/mano.component';

//Services
import { JuegoService } from './services/juego.service';
import { CartaComponent } from './component/carta/carta.component';
import { ManoRivalComponent } from './component/mano-rival/mano-rival.component'


@NgModule({
  declarations: [
    AppComponent,
    MesaComponent,
    ManoComponent,
    CartaComponent,
    ManoRivalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
