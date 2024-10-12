import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisasComponent } from "./components/divisas/divisas.component";
import { HomeComponent } from "./components/home/home.component";
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'divisas', component: DivisasComponent },
  { path: 'estadisticas', component: EstadisticasComponent}, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
