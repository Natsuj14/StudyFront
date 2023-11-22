import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  

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
import { AvatarModule } from 'ngx-avatars';
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
import { FormTemaComponent } from './Componentes/Forms/form-tema/form-tema.component';
import { FormModuloComponent } from './Componentes/Forms/form-modulo/form-modulo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './Componentes/login/login.component';


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
    DragDropComponent,
    FormUsuarioComponent,
    FormRolComponent,
    FormPruebaComponent,
    FormAreaComponent,
    FormEstadisticaComponent,
    FormIngresoComponent,
    FormPersonaComponent,
    FormMateriaComponent,
    FormPreguntaComponent,
    FormRolPermisoComponent,
    FormTemaComponent,
    FormModuloComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
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
    DragDropModule,
    AvatarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
