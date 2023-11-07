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
    Enunciado: ['', Validators.required],
    Respuesta: ['', Validators.required],
    OpcionA: ['', Validators.required],
    OpcionB: ['', Validators.required],
    OpcionC: ['', Validators.required],
  });

  titulo = "";
  accion = "";
  
  infoPregunta: PreguntasModels = {
    idTema: 0,
    enunciado: "",
    respuesta: "",
    opcionA: "",
    opcionB: "",
    opcionC: ""
  }

  infoPregunta1 = {
    idPregunta: 0,
    idTema: 0,
    enunciado: "",
    respuesta: "",
    opcionA: "",
    opcionB: "",
    opcionC: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {
  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == "Modificar") {
      console.log(this.modalService.pregunta);
      this.addressFormPregunta.controls['Enunciado'].setValue(
        this.modalService.pregunta.enunciado + ''
      );
      this.addressFormPregunta.controls['OpcionA'].setValue(
        this.modalService.pregunta.opcionA + ''
      );
      this.addressFormPregunta.controls['OpcionB'].setValue(
        this.modalService.pregunta.opcionB + ''
      );
      this.addressFormPregunta.controls['OpcionC'].setValue(
        this.modalService.pregunta.opcionC + ''
      );
      this.addressFormPregunta.controls['Respuesta'].setValue(
        this.modalService.pregunta.respuesta + ''
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoPregunta.idTema = this.addressFormPregunta.controls['Tema'].value;
      this.infoPregunta.enunciado = this.addressFormPregunta.controls['Enunciado'].value;
      this.infoPregunta.respuesta = this.addressFormPregunta.controls['Respuesta'].value;
      this.infoPregunta.opcionA = this.addressFormPregunta.controls['OpcionA'].value;
      this.infoPregunta.opcionB = this.addressFormPregunta.controls['OpcionB'].value;
      this.infoPregunta.opcionC = this.addressFormPregunta.controls['OpcionC'].value;

      console.log(this.infoPregunta);

      if (this.modalService.accion.value == "Modificar") {

        this.infoPregunta1.idPregunta = this.modalService.id;
        this.infoPregunta1.idTema = this.infoPregunta.idTema;
        this.infoPregunta1.enunciado = this.infoPregunta.enunciado;
        this.infoPregunta1.respuesta = this.infoPregunta.respuesta;
        this.infoPregunta1.opcionA = this.infoPregunta.opcionA;
        this.infoPregunta1.opcionB = this.infoPregunta.opcionB;
        this.infoPregunta1.opcionC = this.infoPregunta.opcionC;

        const response = await this.api.put("Preguntas", this.modalService.id + '', this.infoPregunta1);

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
