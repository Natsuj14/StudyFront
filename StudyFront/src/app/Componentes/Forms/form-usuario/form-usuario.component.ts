import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuariosModel } from 'src/app/Models/Usuarios.Models';
import { ApiService } from 'src/app/Services/api.service';
import { ModalServoceService } from 'src/app/Services/modal.servoce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  private fb = inject(FormBuilder);

  addressFormUsuario = this.fb.group({
    idpersona: [null, Validators.required],
    nickname: [null, Validators.required],
    contraseña: [null, Validators.required]
  });

  titulo = "";
  accion = "";
  infoUsuario: UsuariosModel = {
    idPersona: 0,
    nickname: "",
    contraseña: "",
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoUsuario.idPersona = this.addressFormUsuario.controls['idpersona'].value;
      this.infoUsuario.nickname = this.addressFormUsuario.controls['nickname'].value;
      this.infoUsuario.contraseña = this.addressFormUsuario.controls['contraseña'].value;

      console.log(this.infoUsuario);

      const response = await this.api.post("Usuario", this.infoUsuario);

      if (response) {
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
