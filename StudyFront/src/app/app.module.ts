import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Componentes/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PreguntaComponent } from './Componentes/pregunta/pregunta.component';
import { TemaComponent } from './Componentes/tema/tema.component';
import { MateriaComponent } from './Componentes/materia/materia.component';
import { AreaComponent } from './Componentes/area/area.component';
import { PruebaComponent } from './Componentes/prueba/prueba.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { PersonaComponent } from './Componentes/persona/persona.component';
import { RolComponent } from './Componentes/rol/rol.component';
import { RolPermisoComponent } from './Componentes/rol-permiso/rol-permiso.component';
import { ModuloComponent } from './Componentes/modulo/modulo.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { IngresoComponent } from './Componentes/ingreso/ingreso.component';
import { AddressFormComponent } from './Componentes/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './Componentes/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TreeComponent } from './Componentes/tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponent } from './Componentes/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PreguntaComponent,
    TemaComponent,
    MateriaComponent,
    AreaComponent,
    PruebaComponent,
    UsuarioComponent,
    PersonaComponent,
    RolComponent,
    RolPermisoComponent,
    ModuloComponent,
    EstadisticaComponent,
    IngresoComponent,
    AddressFormComponent,
    TableComponent,
    DashboardComponent,
    TreeComponent,
    DragDropComponent
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
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
