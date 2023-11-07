import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IngresosModels } from 'src/app/Models/IngresosModels';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingreso',
  templateUrl: './form-ingreso.component.html',
  styleUrls: ['./form-ingreso.component.css']
})
export class FormIngresoComponent implements OnInit {

  private fb = inject(FormBuilder);
  addressFormIngreso = this.fb.group({
    idusuario: [0, Validators.required],
    fecha: ['', Validators.required],
    tipo: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  infoIngreso: IngresosModels = {
    idUsuario: 0,
    fecha: "",
    tipo: ""
  }

  infoIngresoPut = {
    idIngreso: 0,
    idUsuario: 0,
    fecha: "",
    tipo: ""
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }

  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.persona);
      this.addressFormIngreso.controls['idusuario'].setValue(
        this.modalService.ingreso.idUsuario
      );
      this.addressFormIngreso.controls['fecha'].setValue(
        this.modalService.ingreso.fecha
      );
      this.addressFormIngreso.controls['tipo'].setValue(
        this.modalService.ingreso.tipo
      );
    }else{
      this.addressFormIngreso.controls['idusuario'].setValue(
        null
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoIngreso.idUsuario = Number(this.addressFormIngreso.controls['idusuario'].value);
      this.infoIngreso.fecha = this.addressFormIngreso.controls['fecha'].value;
      this.infoIngreso.tipo = this.addressFormIngreso.controls['tipo'].value;

      if (this.modalService.accion.value == "Modificar") {

        this.infoIngresoPut.idIngreso = this.modalService.id;
        this.infoIngresoPut.idUsuario = this.infoIngreso.idUsuario;
        this.infoIngresoPut.fecha = this.infoIngreso.fecha;
        this.infoIngresoPut.tipo = this.infoIngreso.tipo;

        const response = await this.api.put("Ingreso",this.modalService.id+'', this.infoIngresoPut);

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

        const response = await this.api.post("Ingreso", this.infoIngreso);

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
