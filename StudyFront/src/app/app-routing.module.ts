import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { RolComponent } from './Componentes/rol/rol.component';
import { PruebaComponent } from './Componentes/prueba/prueba.component';
import { AreaComponent } from './Componentes/area/area.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { IngresoComponent } from './Componentes/ingreso/ingreso.component';

const routes: Routes = [
  { path: "Usuarios", component: UsuarioComponent },
  { path: "Roles", component: RolComponent },
  { path: "Pruebas", component: PruebaComponent },
  { path: "Areas", component: AreaComponent },
  { path: "Estadisticas", component: EstadisticaComponent },
  { path: "Ingresos", component: IngresoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
