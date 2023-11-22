import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-forgotpwd',
  templateUrl: './form-forgotpwd.component.html',
  styleUrls: ['./form-forgotpwd.component.css']
})
export class FormForgotpwdComponent {
  private fb = inject(FormBuilder);
  addressFormForgotPWD = this.fb.group({
    correo: [null, [Validators.required, Validators.email]]
  });

  hasUnitNumber = false;

  onSubmit(): void {
    alert('Thanks!');
  }
}
