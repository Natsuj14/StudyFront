import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  addressFormLogin = this.fb.group({
    usuario: [null, Validators.required],
    contrasena: [null, Validators.required]
  });

  hasUnitNumber = false;

  infoUsuario = {
    usuario: "",
    contrasena: ""
  }

  constructor(
    public api: ApiService,
  ) { }

  public async onSubmit(): Promise<void> {
    try {
      this.infoUsuario.usuario = this.addressFormLogin.controls['usuario'].value;
      this.infoUsuario.contrasena = this.addressFormLogin.controls['contrasena'].value;

      const res = await this.api.login(this.infoUsuario.usuario, this.infoUsuario.contrasena);
      console.log("I got:");
      console.log(res.body);

      if (res) {
        const result = await Swal.fire({
          title: 'Dato confirmado',
          text: 'Ingreso',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
      } else {
        Swal.fire(
          'Ingreso fallido',
          'Datos incorrectos, intente de nuevo',
          'error'
        );
      }
    } catch (error) {
      Swal.fire(
        'Ingreso fallido',
        'Datos incorrectos, intente de nuevo',
        'error'
      );
    }
  }

}
