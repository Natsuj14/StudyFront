import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RolPermisoModels } from 'src/app/Models/RolPermisoModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-rol-permiso',
  templateUrl: './form-rol-permiso.component.html',
  styleUrls: ['./form-rol-permiso.component.css']
})
export class FormRolPermisoComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormRolPermiso = this.fb.group({
    rol: [null, Validators.required],
    modulo: [null, Validators.required],
    permisoGet: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPost: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoDelete: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPut: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoGetById: [null, [Validators.required, Validators.pattern(/^(Si|No)$/i)]],

  });

  titulo = "";
  accion = "";
  infoRolPermiso: RolPermisoModels = {
    IdRol: 0,
    IdModulo: 0,
    PermisoPost: true,
    PermisoDelete: false,
    PermisoGet: false,
    PermisoPut: false,
    PermisoGetById: false
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoRolPermiso.IdRol = this.addressFormRolPermiso.controls['rol'].value;
      this.infoRolPermiso.IdModulo = this.addressFormRolPermiso.controls['modulo'].value;
      this.infoRolPermiso.PermisoDelete = this.addressFormRolPermiso.controls['permisoDelete'].value === 'Si';
      this.infoRolPermiso.PermisoPost = this.addressFormRolPermiso.controls['permisoPost'].value === 'Si';
      this.infoRolPermiso.PermisoGet = this.addressFormRolPermiso.controls['permisoGet'].value === 'Si';
      this.infoRolPermiso.PermisoPut = this.addressFormRolPermiso.controls['permisoPut'].value === 'Si';
      this.infoRolPermiso.PermisoGetById = this.addressFormRolPermiso.controls['permisoGetById'].value === 'Si';

      console.log(this.infoRolPermiso);

      const response = await this.api.post("RolPermiso", this.infoRolPermiso);

      if (response) {
        console.log(response);
        const result = await Swal.fire({
          title: 'Nuevo dato añadido',
          text: 'Se añadió el campo exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
      } else {
        Swal.fire(
          'Error al enviar los datos',
          'Ha ocurrido un error al agregar el campo',
          'error'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error al enviar los datos',
        'Por favor complete los campos correctamente',
        'error'
      );
    }
  }

}
