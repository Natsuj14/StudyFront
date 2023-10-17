import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EstadisticasModels } from 'src/app/Models/EstadisticasModels';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estadistica',
  templateUrl: './form-estadistica.component.html',
  styleUrls: ['./form-estadistica.component.css']
})
export class FormEstadisticaComponent {

  private fb = inject(FormBuilder);
  addressFormEstadistica = this.fb.group({
    idUsuario: [null, Validators.required],
    totalpruebas: [null, Validators.required],
    tiempopromedio: [null, Validators.required],
    promedio: [null, Validators.required],
    mejormateria: [null, Validators.required],
    peormateria: [null, Validators.required]
  });

  infoEstadistica: EstadisticasModels = {
    
    idUsuario: 0,
    totalPruebas: 0,
    tiempoPromedio: "",
    promedio: "",
    mejorMateria: "",
    peorMateria: "",

  }

  hasUnitNumber = false;

  constructor(public api: ApiService) {

  }

  async onSubmit(): Promise<void> {
    try {
      this.infoEstadistica.idUsuario = this.addressFormEstadistica.controls['idUsuario'].value;
      this.infoEstadistica.tiempoPromedio = this.addressFormEstadistica.controls['tiempopromedio'].value;
      this.infoEstadistica.promedio = this.addressFormEstadistica.controls['promedio'].value;
      this.infoEstadistica.totalPruebas = this.addressFormEstadistica.controls['totalpruebas'].value;
      this.infoEstadistica.mejorMateria = this.addressFormEstadistica.controls['mejormateria'].value;
      this.infoEstadistica.peorMateria = this.addressFormEstadistica.controls['peormateria'].value;

      console.log(this.infoEstadistica);

      const response = await this.api.post("Estadisticas", this.infoEstadistica);

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
