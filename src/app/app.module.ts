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
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { TreeComponent } from './Components/tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponent } from './Components/drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PreguntasComponent } from './Components/preguntas/preguntas.component';
import { TableComponent } from './Components/table/table.component';
import { AddressComponent } from './Components/address/address.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

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
    DashboardComponent,
    TreeComponent,
    DragDropComponent,
    PreguntasComponent,
    TableComponent,
    AddressComponent
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
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    DragDropModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
