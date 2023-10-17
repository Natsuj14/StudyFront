import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IngresosModels } from 'src/app/Models/IngresosModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingreso',
  templateUrl: './form-ingreso.component.html',
  styleUrls: ['./form-ingreso.component.css']
})
export class FormIngresoComponent {

  private fb = inject(FormBuilder);
  addressFormIngreso = this.fb.group({
    idusuario: [null, Validators.required],
    fecha: [null, Validators.required],
    tipo: [null, Validators.required]
  });

  infoIngreso: IngresosModels = {
    
    idUsuario: 0,
    fecha: "",
    tipo: "",

  }

  hasUnitNumber = false;

  constructor(public api: ApiService) {

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
