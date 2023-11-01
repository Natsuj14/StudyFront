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
    idusuario: [null, Validators.required],
    fecha: [null, Validators.required],
    tipo: [null, Validators.required]
  });

  titulo = "";
  accion = "";
  infoIngreso: IngresosModels = {
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
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoIngreso.idUsuario = this.addressFormIngreso.controls['idusuario'].value;
      this.infoIngreso.fecha = this.addressFormIngreso.controls['fecha'].value;
      this.infoIngreso.tipo = this.addressFormIngreso.controls['tipo'].value;

      console.log(this.infoIngreso);

      const response = await this.api.post("Ingreso", this.infoIngreso);

      if (response) {
        console.log(response)
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
