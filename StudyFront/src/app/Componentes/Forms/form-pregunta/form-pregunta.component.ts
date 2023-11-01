import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { PreguntasModels } from 'src/app/Models/PreguntasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-pregunta',
  templateUrl: './form-pregunta.component.html',
  styleUrls: ['./form-pregunta.component.css']
})
export class FormPreguntaComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormPregunta = this.fb.group({
    Tema: [null, Validators.required],
    Enunciado: [null, Validators.required],
    Respuesta: [null, Validators.required],
    OpcionA: [null, Validators.required],
    OpcionB: [null, Validators.required],
    OpcionC: [null, Validators.required],
  });

  titulo = "";
  accion = "";
  infoPregunta: PreguntasModels = {
    idTema: 0,
    Enunciado: "",
    Respuesta: "",
    OpcionA: "",
    OpcionB: "",
    OpcionC: ""
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
      this.infoPregunta.idTema = this.addressFormPregunta.controls['Tema'].value;
      this.infoPregunta.Enunciado = this.addressFormPregunta.controls['Enunciado'].value;
      this.infoPregunta.Respuesta = this.addressFormPregunta.controls['Respuesta'].value;
      this.infoPregunta.OpcionA = this.addressFormPregunta.controls['OpcionA'].value;
      this.infoPregunta.OpcionB = this.addressFormPregunta.controls['OpcionB'].value;
      this.infoPregunta.OpcionC = this.addressFormPregunta.controls['OpcionC'].value;

      console.log(this.infoPregunta);

      const response = await this.api.post("Preguntas", this.infoPregunta);

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
