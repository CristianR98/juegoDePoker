import { RouterModule, Routes } from '@angular/router';
import { MesaComponent } from './component/mesa/mesa.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'juegoIA', component: MesaComponent},
    { path: '**', pathMatch:'full',redirectTo:'home' }
];

export const APP_ROUTING = RouterModule.forRoot(routes)