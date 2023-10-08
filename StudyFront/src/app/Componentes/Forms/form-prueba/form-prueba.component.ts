import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-prueba.component.html',
  styleUrls: ['./form-prueba.component.css']
})
export class FormPruebaComponent {

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    duracion: [null, Validators.required],
    cantidadpreguntas: [null, Validators.required],
    calificacion: [null, Validators.required],
    fechaprueba: [null, Validators.required],
    area: [null, Validators.required]
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