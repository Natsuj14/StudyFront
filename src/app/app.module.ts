import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudiantesComponent } from './Components/estudiantes/estudiantes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PersonasComponent } from './Components/personas/personas.component';
import { TablaComponent } from './Components/tabla/tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
<<<<<<< HEAD
import { RolComponent } from './Components/rol/rol.component';
import { RolPermisoComponent } from './Components/rol-permiso/rol-permiso.component';
import { ModuloComponent } from './Components/modulo/modulo.component';
import { MateriaComponent } from './Components/materia/materia.component';
=======
import { PreguntasComponent } from './preguntas/preguntas.component';
import { TemasComponent } from './temas/temas.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
>>>>>>> 3169d8cd98b62963bb182ade4a5d824efa9377a3

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    MenuComponent,
    PersonasComponent,
    TablaComponent,
<<<<<<< HEAD
    RolComponent,
    RolPermisoComponent,
    ModuloComponent,
    MateriaComponent,
=======
    PreguntasComponent,
    TemasComponent,
    PruebasComponent,
    UsuariosComponent,
    IngresosComponent,
    EstadisticasComponent
>>>>>>> 3169d8cd98b62963bb182ade4a5d824efa9377a3
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
