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
    permisoGet: ['', [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPost: ['', [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoDelete: ['', [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoPut: ['', [Validators.required, Validators.pattern(/^(Si|No)$/i)]],
    permisoGetById: ['', [Validators.required, Validators.pattern(/^(Si|No)$/i)]],

  });

  titulo = "";
  accion = "";
  infoRolPermiso: RolPermisoModels = {
    idRol: 0,
    idModulo: 0,
    permisoPost: true,
    permisoDelete: false,
    permisoGet: false,
    permisoPut: false,
    permisoGetById: false
  }

  infoRolPermiso1 = {
    idRolPermiso: 0,
    idRol: 0,
    idModulo: 0,
    permisoPost: true,
    permisoDelete: false,
    permisoGet: false,
    permisoPut: false,
    permisoGetById: false
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.rolPermiso.permisoPost);
      if (this.modalService.rolPermiso.permisoGet) {
        this.addressFormRolPermiso.controls['permisoGet'].setValue('Si');
      } else {
        this.addressFormRolPermiso.controls['permisoGet'].setValue('No');
      }
      if (this.modalService.rolPermiso.permisoPost) {
        this.addressFormRolPermiso.controls['permisoPost'].setValue('Si');
      } else {
        this.addressFormRolPermiso.controls['permisoPost'].setValue('No');
      }
      if (this.modalService.rolPermiso.permisoDelete) {
        this.addressFormRolPermiso.controls['permisoDelete'].setValue('Si');
      } else {
        this.addressFormRolPermiso.controls['permisoDelete'].setValue('No');
      }
      if (this.modalService.rolPermiso.permisoPut) {
        this.addressFormRolPermiso.controls['permisoPut'].setValue('Si');
      } else {
        this.addressFormRolPermiso.controls['permisoPut'].setValue('No');
      }
      if (this.modalService.rolPermiso.permisoGetById) {
        this.addressFormRolPermiso.controls['permisoGetById'].setValue('Si');
      } else {
        this.addressFormRolPermiso.controls['permisoGetById'].setValue('No');
      }
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoRolPermiso.idRol = this.addressFormRolPermiso.controls['rol'].value;
      this.infoRolPermiso.idModulo = this.addressFormRolPermiso.controls['modulo'].value;
      this.infoRolPermiso.permisoDelete = this.addressFormRolPermiso.controls['permisoDelete'].value === 'Si';
      this.infoRolPermiso.permisoPost = this.addressFormRolPermiso.controls['permisoPost'].value === 'Si';
      this.infoRolPermiso.permisoGet = this.addressFormRolPermiso.controls['permisoGet'].value === 'Si';
      this.infoRolPermiso.permisoPut = this.addressFormRolPermiso.controls['permisoPut'].value === 'Si';
      this.infoRolPermiso.permisoGetById = this.addressFormRolPermiso.controls['permisoGetById'].value === 'Si';

      console.log(this.infoRolPermiso);

      if (this.modalService.accion.value == "Modificar") {

        this.infoRolPermiso1.idRolPermiso = this.modalService.id;
        this.infoRolPermiso1.idRol = this.infoRolPermiso.idRol;
        this.infoRolPermiso1.idModulo = this.infoRolPermiso.idModulo;
        this.infoRolPermiso1.permisoGet = this.infoRolPermiso.permisoGet;
        this.infoRolPermiso1.permisoPost = this.infoRolPermiso.permisoPost;
        this.infoRolPermiso1.permisoDelete = this.infoRolPermiso.permisoDelete;
        this.infoRolPermiso1.permisoPut = this.infoRolPermiso.permisoPut;
        this.infoRolPermiso1.permisoGetById = this.infoRolPermiso.permisoGetById;

        const response = await this.api.put("RolPermiso", this.modalService.id + '', this.infoRolPermiso1);

        if (response) {
          const result = await Swal.fire({
            title: 'Dato modificado',
            text: 'Se modificó el campo exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
            window.location.reload();
          }
        } else {
          Swal.fire(
            'Error al enviar los datos',
            'Ha ocurrido un error al editar el campo',
            'error'
          );
        }

      } else {
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
