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
import { RolComponent } from './Components/rol/rol.component';
import { RolPermisoComponent } from './Components/rol-permiso/rol-permiso.component';
import { ModuloComponent } from './Components/modulo/modulo.component';
import { MateriaComponent } from './Components/materia/materia.component';
import { PersonaComponent } from './Components/persona/persona.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    MenuComponent,
    PersonasComponent,
    TablaComponent,
    RolComponent,
    RolPermisoComponent,
    ModuloComponent,
    MateriaComponent,
    PersonaComponent
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
