import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    // idpersona: [null, Validators.required],
    nickname: [null, Validators.required],
    contraseña: [null, Validators.required]
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
