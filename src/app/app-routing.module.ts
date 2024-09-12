import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { DivisasComponent } from "./components/divisas/divisas.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página de inicio en la raíz
  { path: 'divisas', component: DivisasComponent },  // Página de divisas
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirige rutas no encontradas a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
