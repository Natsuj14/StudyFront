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
    idRol: [null, Validators.compose([Validators.required, Validators.nullValidator])],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    edad: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    genero: ['', Validators.required],
    cedula: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
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

  infoPersona1 = {
    idPersona: 0,
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
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.persona);
      this.addressFormPersona.controls['nombre'].setValue(
        this.modalService.persona.nombre + ''
      );
      this.addressFormPersona.controls['apellido'].setValue(
        this.modalService.persona.apellido + ''
      );
      this.addressFormPersona.controls['correo'].setValue(
        this.modalService.persona.correo + ''
      );
      this.addressFormPersona.controls['edad'].setValue(
        this.modalService.persona.edad
      );
      this.addressFormPersona.controls['genero'].setValue(
        this.modalService.persona.genero + ''
      );
      this.addressFormPersona.controls['cedula'].setValue(
        this.modalService.persona.cc
      );
    } else {
      this.addressFormPersona.controls['cedula'].setValue(
        null
      );
      this.addressFormPersona.controls['edad'].setValue(
        null
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoPersona.cc = this.addressFormPersona.controls['cedula'].value;
      this.infoPersona.nombre = this.addressFormPersona.controls['nombre'].value;
      this.infoPersona.apellido = this.addressFormPersona.controls['apellido'].value;
      this.infoPersona.edad = this.addressFormPersona.controls['edad'].value;
      this.infoPersona.genero = this.addressFormPersona.controls['genero'].value;
      this.infoPersona.correo = this.addressFormPersona.controls['correo'].value;
      this.infoPersona.idRol = this.addressFormPersona.controls['idRol'].value;

      console.log(this.infoPersona);

      if (this.modalService.accion.value == "Modificar") {
        
        this.infoPersona1.idPersona = this.modalService.id;
        this.infoPersona1.cc = this.infoPersona.cc;
        this.infoPersona1.nombre = this.infoPersona.nombre;
        this.infoPersona1.apellido = this.infoPersona.apellido;
        this.infoPersona1.edad = this.infoPersona.edad;
        this.infoPersona1.correo = this.infoPersona.correo;
        this.infoPersona1.idRol = this.infoPersona.idRol;
        this.infoPersona1.genero = this.infoPersona.genero;


        const response = await this.api.put("Persona",this.modalService.id+'', this.infoPersona1);

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