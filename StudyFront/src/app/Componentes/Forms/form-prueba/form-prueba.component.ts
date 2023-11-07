import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PruebasModels } from 'src/app/Models/PruebasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-prueba.component.html',
  styleUrls: ['./form-prueba.component.css']
})
export class FormPruebaComponent implements OnInit {

  private fb = inject(FormBuilder);
  addressFormPrueba = this.fb.group({
    idUsuario: [0, Validators.required],
    duracion: [0, Validators.required],
    cantidadpreguntas: [0, Validators.required],
    calificacion: [0, Validators.required],
    fechaprueba: ['', Validators.required],
    idArea: [0, Validators.required]
  });

  titulo = "";
  accion = "";
  infoPrueba: PruebasModels = {
    idUsuario: 0,
    calificacion: 0,
    cantidadPreguntas: 0,
    duracion: 0,
    fechaPrueba: "", // 2023-09-26 17:30:00.000
    idArea: 0,
  }

  infoPruebaPut = {
    idPrueba: 0,
    idUsuario: 0,
    calificacion: 0,
    cantidadPreguntas: 0,
    duracion: 0,
    fechaPrueba: "", // 2023-09-26 17:30:00.000
    idArea: 0,
  }


  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }

  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    console.log(this.modalService.usuario);
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.persona);
      this.addressFormPrueba.controls['idUsuario'].setValue(
        this.modalService.prueba.idUsuario
      );
      this.addressFormPrueba.controls['calificacion'].setValue(
        this.modalService.prueba.calificacion
      );
      this.addressFormPrueba.controls['cantidadpreguntas'].setValue(
        this.modalService.prueba.cantidadPreguntas
      );
      this.addressFormPrueba.controls['idArea'].setValue(
        this.modalService.prueba.idArea
      );
      this.addressFormPrueba.controls['duracion'].setValue(
        this.modalService.prueba.duracion
      );
      this.addressFormPrueba.controls['fechaprueba'].setValue(
        this.modalService.prueba.fechaPrueba + ''
      );
    }else{
      this.addressFormPrueba.controls['idUsuario'].setValue(
        null
      );
      this.addressFormPrueba.controls['calificacion'].setValue(
        null
      );
      this.addressFormPrueba.controls['cantidadpreguntas'].setValue(
        null
      );
      this.addressFormPrueba.controls['idArea'].setValue(
        null
      );
      this.addressFormPrueba.controls['duracion'].setValue(
        null
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoPrueba.idUsuario = Number(this.addressFormPrueba.controls['idUsuario'].value);
      this.infoPrueba.idArea = Number(this.addressFormPrueba.controls['idArea'].value);
      this.infoPrueba.calificacion = Number(this.addressFormPrueba.controls['calificacion'].value);
      this.infoPrueba.cantidadPreguntas = Number(this.addressFormPrueba.controls['cantidadpreguntas'].value);
      this.infoPrueba.duracion = Number(this.addressFormPrueba.controls['duracion'].value);
      this.infoPrueba.fechaPrueba = this.addressFormPrueba.controls['fechaprueba'].value;

      if (this.modalService.accion.value == "Modificar") {

        this.infoPruebaPut.idPrueba = this.modalService.id;
        this.infoPruebaPut.idUsuario = this.infoPrueba.idUsuario;
        this.infoPruebaPut.idArea = this.infoPrueba.idArea;
        this.infoPruebaPut.calificacion = this.infoPrueba.calificacion;
        this.infoPruebaPut.cantidadPreguntas = this.infoPrueba.cantidadPreguntas;
        this.infoPruebaPut.duracion = this.infoPrueba.duracion;
        this.infoPruebaPut.fechaPrueba = this.infoPrueba.fechaPrueba;

        const response = await this.api.put("Prueba",this.modalService.id+'', this.infoPruebaPut);

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

        const response = await this.api.post("Prueba", this.infoPrueba);

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