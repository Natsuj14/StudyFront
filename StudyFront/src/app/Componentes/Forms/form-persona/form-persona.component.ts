import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { PersonasModels } from 'src/app/Models/PersonasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressFormPersona = this.fb.group({
    rol: [null, Validators.required],
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    correo: [null, [Validators.required, Validators.email]],
    edad: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    genero: [null, Validators.required],
    cedula: [null, [Validators.required, Validators.pattern(/^\d+$/)]],


  });

  titulo = "";
  accion = "";
  infoPersona: PersonasModels = {
    idRol: 0,
    nombre: "",
    apellido: "",
    correo: "",
    edad: 0,
    cc: 0,
    genero: "",
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
      this.infoPersona.cc = this.addressFormPersona.controls['cedula'].value;
      this.infoPersona.nombre = this.addressFormPersona.controls['nombre'].value;
      this.infoPersona.apellido = this.addressFormPersona.controls['apellido'].value;
      this.infoPersona.edad = this.addressFormPersona.controls['edad'].value;
      this.infoPersona.genero = this.addressFormPersona.controls['genero'].value;
      this.infoPersona.correo = this.addressFormPersona.controls['correo'].value;
      this.infoPersona.idRol = this.addressFormPersona.controls['rol'].value;

      console.log(this.infoPersona);

      const response = await this.api.post("Persona", this.infoPersona);

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

