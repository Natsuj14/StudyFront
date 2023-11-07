import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { TemasModels } from 'src/app/Models/TemasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-tema',
  templateUrl: './form-tema.component.html',
  styleUrls: ['./form-tema.component.css']
})
export class FormTemaComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormTema = this.fb.group({
    materia: [null, Validators.required],
    nombre: ['', Validators.required],
    contenido: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  infoTema: TemasModels = {
    idMateria: 0,
    nombre: "",
    contenido: ""
  }

  infoTema1 = {
    idTema: 0,
    idMateria: 0,
    nombre: "",
    contenido: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == "Modificar") {
      this.addressFormTema.controls['nombre'].setValue(
        this.modalService.tema.nombre + ''
      );
      this.addressFormTema.controls['contenido'].setValue(
        this.modalService.tema.contenido + ''
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {

      this.infoTema.idMateria = this.addressFormTema.controls['materia'].value;
      this.infoTema.nombre = this.addressFormTema.controls['nombre'].value;
      this.infoTema.contenido = this.addressFormTema.controls['contenido'].value;

      console.log(this.infoTema);

      if (this.modalService.accion.value == "Modificar") {

        this.infoTema1.idTema = this.modalService.id;
        this.infoTema1.idMateria = this.infoTema.idMateria;
        this.infoTema1.nombre = this.infoTema.nombre;
        this.infoTema1.contenido = this.infoTema.contenido;

        const response = await this.api.put("Tema", this.modalService.id + '', this.infoTema1);

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
        const response = await this.api.post("Tema", this.infoTema);

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
