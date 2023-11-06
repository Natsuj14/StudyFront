import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AreasModels } from '../Models/AreasModels';
import { EstadisticasModels } from '../Models/EstadisticasModels';
import { IngresosModels } from '../Models/IngresosModels';
import { MateriasModels } from '../Models/MateriasModels';
import { PersonasModels } from '../Models/PersonasModels';
import { PreguntasModels } from '../Models/PreguntasModels';
import { RolesModels } from '../Models/RolesModels';
import { RolPermisoModels } from '../Models/RolPermisoModels';
import { TemasModels } from '../Models/TemasModels';
import { UsuariosModel } from '../Models/Usuarios.Models';
import { PruebasModels } from '../Models/PruebasModels';

@Injectable({
  providedIn: 'root'
})
export class ModalServoceService {

  id: number;
  area: AreasModels;
  estadistica: EstadisticasModels;
  ingreso: IngresosModels;
  materia: MateriasModels;
  modulo: MateriasModels;
  persona: PersonasModels;
  pregunta: PreguntasModels;
  prueba: PruebasModels;
  rol: RolesModels;
  rolPermiso: RolPermisoModels;
  tema: TemasModels;
  usuario: UsuariosModel;


  titulo = "";
  accion = new BehaviorSubject("");
  constructor() { }
}
