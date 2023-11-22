import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { RolComponent } from './Componentes/rol/rol.component';
import { PruebaComponent } from './Componentes/prueba/prueba.component';
import { AreaComponent } from './Componentes/area/area.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { IngresoComponent } from './Componentes/ingreso/ingreso.component';
import { MateriaComponent } from './Componentes/materia/materia.component';
import { PersonaComponent } from './Componentes/persona/persona.component';
import { PreguntaComponent } from './Componentes/pregunta/pregunta.component';
import { RolPermisoComponent } from './Componentes/rol-permiso/rol-permiso.component';
import { TemaComponent } from './Componentes/tema/tema.component';
import { ModuloComponent } from './Componentes/modulo/modulo.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "Usuarios", component: UsuarioComponent },
  { path: "Roles", component: RolComponent },
  { path: "Pruebas", component: PruebaComponent },
  { path: "Areas", component: AreaComponent },
  { path: "Estadisticas", component: EstadisticaComponent },
  { path: "Ingresos", component: IngresoComponent },
  { path: "Materias", component: MateriaComponent },
  { path: "Personas", component: PersonaComponent },
  { path: "Preguntas", component: PreguntaComponent },
  { path: "Rol-Permiso", component: RolPermisoComponent },
  { path: "Temas", component: TemaComponent },
  { path: "Modulos", component: ModuloComponent },
  { path: "Login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
