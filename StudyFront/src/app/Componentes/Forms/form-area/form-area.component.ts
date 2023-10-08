import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.css']
})
export class FormAreaComponent {

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    nombre: [null, Validators.required]
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