import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estadistica',
  templateUrl: './form-estadistica.component.html',
  styleUrls: ['./form-estadistica.component.css']
})
export class FormEstadisticaComponent {

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    totalpruebas: [null, Validators.required],
    tiempoprueba: [null, Validators.required],
    promedio: [null, Validators.required],
    mejormateria: [null, Validators.required],
    peormateria: [null, Validators.required]
  });

  hasUnitNumber = false;

  onSubmit(): void {
    Swal.fire(
      'El formulario se ha enviado correctamente',
      '',
      'success'
    );    
  }
}
