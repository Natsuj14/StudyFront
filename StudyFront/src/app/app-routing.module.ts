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
import { FormUsuarioComponent } from './Componentes/Forms/form-usuario/form-usuario.component';
import { FormRolComponent } from './Componentes/Forms/form-rol/form-rol.component';
import { FormPruebaComponent } from './Componentes/Forms/form-prueba/form-prueba.component';
import { FormAreaComponent } from './Componentes/Forms/form-area/form-area.component';
import { FormEstadisticaComponent } from './Componentes/Forms/form-estadistica/form-estadistica.component';
import { FormIngresoComponent } from './Componentes/Forms/form-ingreso/form-ingreso.component';
import { FormPersonaComponent } from './Componentes/Forms/form-persona/form-persona.component';
import { FormMateriaComponent } from './Componentes/Forms/form-materia/form-materia.component';
import { FormPreguntaComponent } from './Componentes/Forms/form-pregunta/form-pregunta.component';
import { FormRolPermisoComponent } from './Componentes/Forms/form-rol-permiso/form-rol-permiso.component';
import { FormModuloComponent } from './Componentes/Forms/form-modulo/form-modulo.component';
import { FormTemaComponent } from './Componentes/Forms/form-tema/form-tema.component';


const routes: Routes = [
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
  { path: "FormUsuarios", component: FormUsuarioComponent },
  { path: "FormRoles", component: FormRolComponent },
  { path: "FormPruebas", component: FormPruebaComponent },
  { path: "FormAreas", component: FormAreaComponent },
  { path: "FormEstadisticas", component: FormEstadisticaComponent },
  { path: "FormIngresos", component: FormIngresoComponent },
  { path: "FormPersonas", component: FormPersonaComponent },
  { path: "FormMaterias", component: FormMateriaComponent },
  { path: "FormPreguntas", component: FormPreguntaComponent },
  { path: "FormRolPermisos", component: FormRolPermisoComponent },
  { path: "FormModulos", component: FormModuloComponent },
  { path: "FormTema", component: FormTemaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
