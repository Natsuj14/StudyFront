import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PruebasModels } from 'src/app/Models/PruebasModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-prueba.component.html',
  styleUrls: ['./form-prueba.component.css']
})
export class FormPruebaComponent {

  private fb = inject(FormBuilder);
  addressFormPrueba = this.fb.group({
    idUsuario: [null, Validators.required],
    duracion: [null, Validators.required],
    cantidadpreguntas: [null, Validators.required],
    calificacion: [null, Validators.required],
    fechaprueba: [null, Validators.required],
    idArea: [null, Validators.required]
  });

  infoPrueba: PruebasModels = {

    idUsuario: 0,
    calificacion: 0,
    cantidadPreguntas: 0,
    duracion: 0,
    fechaPrueba: "", // 2023-09-26 17:30:00.000
    idArea: 0,

  }

  hasUnitNumber = false;

  constructor(public api: ApiService) {

  }

  async onSubmit(): Promise<void> {
    try {
      this.infoPrueba.idUsuario = this.addressFormPrueba.controls['idUsuario'].value;
      this.infoPrueba.calificacion = this.addressFormPrueba.controls['calificacion'].value;
      this.infoPrueba.cantidadPreguntas = this.addressFormPrueba.controls['cantidadpreguntas'].value;
      this.infoPrueba.duracion = this.addressFormPrueba.controls['duracion'].value;
      this.infoPrueba.fechaPrueba = this.addressFormPrueba.controls['fechaprueba'].value;
      this.infoPrueba.idArea = this.addressFormPrueba.controls['idArea'].value;

      console.log(this.infoPrueba);

      const response = await this.api.post("Prueba", this.infoPrueba);

      if (response) {
        console.log(response)
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