import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadisticasModels } from 'src/app/Models/EstadisticasModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estadistica',
  templateUrl: './form-estadistica.component.html',
  styleUrls: ['./form-estadistica.component.css']
})
export class FormEstadisticaComponent implements OnInit {

  private fb = inject(FormBuilder);
  addressFormEstadistica = this.fb.group({
    idUsuario: [0, Validators.required],
    totalPruebas: [0, Validators.required],
    tiempoPromedio: ['', Validators.required],
    promedio: ['', Validators.required],
    mejorMateria: ['', Validators.required],
    peorMateria: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  infoEstadistica: EstadisticasModels = {
    idUsuario: 0,
    totalPruebas: 0,
    tiempoPromedio: "",
    promedio: "",
    mejorMateria: "",
    peorMateria: "",
  }

  infoEstadisticaPut = {
    idEstadistica: 0,
    idUsuario: 0,
    totalPruebas: 0,
    tiempoPromedio: "",
    promedio: "",
    mejorMateria: "",
    peorMateria: "",
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }

  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    if (this.modalService.accion.value == 'Modificar') {
      this.addressFormEstadistica.controls['idUsuario'].setValue(
        this.modalService.estadistica.idUsuario
      );
      this.addressFormEstadistica.controls['totalPruebas'].setValue(
        this.modalService.estadistica.totalPruebas
      );
      this.addressFormEstadistica.controls['peorMateria'].setValue(
        this.modalService.estadistica.peorMateria + ''
      );
      this.addressFormEstadistica.controls['mejorMateria'].setValue(
        this.modalService.estadistica.mejorMateria + ''
      );
      this.addressFormEstadistica.controls['promedio'].setValue(
        this.modalService.estadistica.promedio + ''
      );
      this.addressFormEstadistica.controls['tiempoPromedio'].setValue(
        this.modalService.estadistica.tiempoPromedio + ''
      );
    } else {
      this.addressFormEstadistica.controls['idUsuario'].setValue(
        null
      );
      this.addressFormEstadistica.controls['totalpruebas'].setValue(
        null
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoEstadistica.idUsuario = Number(this.addressFormEstadistica.controls['idUsuario'].value);
      this.infoEstadistica.totalPruebas = Number(this.addressFormEstadistica.controls['totalPruebas'].value);
      this.infoEstadistica.mejorMateria = this.addressFormEstadistica.controls['mejorMateria'].value;
      this.infoEstadistica.peorMateria = this.addressFormEstadistica.controls['peorMateria'].value;
      this.infoEstadistica.promedio = this.addressFormEstadistica.controls['promedio'].value;
      this.infoEstadistica.tiempoPromedio = this.addressFormEstadistica.controls['tiempoPromedio'].value;

      if (this.modalService.accion.value == "Modificar") {

        this.infoEstadisticaPut.idEstadistica = this.modalService.id;
        this.infoEstadisticaPut.idUsuario = this.infoEstadistica.idUsuario;
        this.infoEstadisticaPut.tiempoPromedio = this.infoEstadistica.tiempoPromedio;
        this.infoEstadisticaPut.peorMateria = this.infoEstadistica.peorMateria;
        this.infoEstadisticaPut.mejorMateria = this.infoEstadistica.mejorMateria;
        this.infoEstadisticaPut.promedio = this.infoEstadistica.promedio;
        this.infoEstadisticaPut.totalPruebas = this.infoEstadistica.totalPruebas;

        const response = await this.api.put("Estadisticas", this.modalService.id + '', this.infoEstadisticaPut);

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

        const response = await this.api.post("Estadisticas", this.infoEstadistica);

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
