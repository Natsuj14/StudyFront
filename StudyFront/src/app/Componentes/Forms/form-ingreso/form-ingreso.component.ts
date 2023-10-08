import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ingreso',
  templateUrl: './form-ingreso.component.html',
  styleUrls: ['./form-ingreso.component.css']
})
export class FormIngresoComponent {

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    // idusuario: [null, Validators.required],
    fecha: [null, Validators.required],
    tipo: [null, Validators.required]
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
