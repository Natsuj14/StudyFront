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
    nombre: [null, Validators.required],
    contenido: [null, Validators.required]
  });

  titulo = "";
  accion = "";
  infoTema: TemasModels = {
    IdMateria: 0,
    Nombre: "",
    Contenido: ""
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

      this.infoTema.IdMateria = this.addressFormTema.controls['materia'].value;
      this.infoTema.Nombre = this.addressFormTema.controls['nombre'].value;
      this.infoTema.Contenido = this.addressFormTema.controls['contenido'].value;

      console.log(this.infoTema);

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
    } catch (error) {
      Swal.fire(
        'Error al enviar los datos',
        'Por favor complete los campos correctamente',
        'error'
      );
    }
  }
}
