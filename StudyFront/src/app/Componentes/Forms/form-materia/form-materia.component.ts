import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MateriasModels } from 'src/app/Models/MateriasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-materia',
  templateUrl: './form-materia.component.html',
  styleUrls: ['./form-materia.component.css']
})
export class FormMateriaComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormMateria = this.fb.group({
    Nombre: ['', Validators.required],
    Area: [null, Validators.required],
  });

  titulo = "";
  accion = "";
  infoMateria: MateriasModels = {
    idArea: 0,
    nombre: ""
  }

  infoMateria1 = {
    idMateria: 0,
    idArea: 0,
    nombre: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.persona);
      this.addressFormMateria.controls['Nombre'].setValue(
        this.modalService.materia.nombre + ''
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {

      this.infoMateria.idArea = this.addressFormMateria.controls['Area'].value;
      this.infoMateria.nombre = this.addressFormMateria.controls['Nombre'].value;

      console.log(this.infoMateria);

      if (this.modalService.accion.value == "Modificar") {

        this.infoMateria1.idMateria = this.modalService.id;
        this.infoMateria1.nombre = this.infoMateria.nombre;
        this.infoMateria1.idArea = this.infoMateria.idArea;

        const response = await this.api.put("Materia", this.modalService.id + '', this.infoMateria1);

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
        const response = await this.api.post("Materia", this.infoMateria);

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

