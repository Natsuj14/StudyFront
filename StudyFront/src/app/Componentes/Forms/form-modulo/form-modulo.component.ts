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
    descripcion: [null, Validators.required]
  });

  titulo = "";
  accion = "";
  infoModulo: ModulosModels = {
    DescripcionMod: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
  }

  async onSubmit(): Promise<void> {
    try {

      this.infoModulo.DescripcionMod = this.addressFormModulo.controls['descripcion'].value;

      console.log(this.infoModulo);

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
    } catch (error) {
      Swal.fire(
        'Error al enviar los datos',
        'Por favor complete los campos correctamente',
        'error'
      );
    }
  }
}
