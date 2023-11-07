import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ModulosModels } from 'src/app/Models/ModulosModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-modulo',
  templateUrl: './form-modulo.component.html',
  styleUrls: ['./form-modulo.component.css']
})
export class FormModuloComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormModulo = this.fb.group({
    descripcion: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  infoModulo: ModulosModels = {
    descripcionMod: ""
  }

  infoModulo1 = {
    idModulo: 0,
    descripcionMod: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    if (this.modalService.accion.value == "Modificar") {
      this.addressFormModulo.controls['descripcion'].setValue(
        this.modalService.modulo.descripcionMod + ''
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {

      this.infoModulo.descripcionMod = this.addressFormModulo.controls['descripcion'].value;

      console.log(this.infoModulo);

      if (this.modalService.accion.value == "Modificar") {

        this.infoModulo1.idModulo = this.modalService.id;
        this.infoModulo1.descripcionMod = this.infoModulo.descripcionMod;

        const response = await this.api.put("Modulos", this.modalService.id + '', this.infoModulo1);

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

        const response = await this.api.post("Modulos", this.infoModulo);

        if (response) {
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
