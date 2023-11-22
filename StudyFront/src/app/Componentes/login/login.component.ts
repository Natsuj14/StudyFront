import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { IngresoService } from 'src/app/Services/ingreso.service';
import Swal from 'sweetalert2';
import { FormForgotpwdComponent } from '../Forms/form-forgotpwd/form-forgotpwd.component';
import { MatDialog } from '@angular/material/dialog';


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

  constructor(public api: ApiService, public ingreso: IngresoService, public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(FormForgotpwdComponent, {
    })
  }

  public async onSubmit(): Promise<void> {
    try {
      this.infoUsuario.usuario = this.addressFormLogin.controls['usuario'].value;
      this.infoUsuario.contrasena = this.addressFormLogin.controls['contrasena'].value;

      const res = await this.api.login(this.infoUsuario.usuario, this.infoUsuario.contrasena);
      console.log("Usuario: ");
      console.log(res.body.usuario);
      var datosUsuario = JSON.stringify(res.body.usuario);
      localStorage.setItem('datosUsuario', datosUsuario);

      if (res) {
        this.ingreso.setUsuarioConectado(true);
        localStorage.setItem('usuarioConectado', 'true');
        Swal.fire({
          title: 'Dato confirmado',
          text: 'Ingreso',
          icon: 'success',
          confirmButtonText: 'OK'
        });
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
