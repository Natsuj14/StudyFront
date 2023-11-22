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
    idpersona: [0, Validators.required],
    nickname: ['', Validators.required],
    contraseña: ['', Validators.required]
  });

  titulo = "";
  accion = "";
  login : boolean;
  infoUsuario: UsuariosModel = {
    idPersona: 0,
    nickname: "",
    contraseña: "",
  }

  infoUsuarioPut = {
    idUsuario: 0,
    idPersona: 0,
    nickname: "",
    contraseña: "",
  }

  hasUnitNumber = false;

  constructor(public api: ApiService, public modalService: ModalServoceService) {

  }
  ngOnInit(): void {
    this.login = this.modalService.login
    this.accion = this.modalService.accion.value;
    this.titulo = this.modalService.titulo;
    console.log(this.modalService.usuario);
    if (this.modalService.accion.value == 'Modificar') {
      console.log(this.modalService.persona);
      this.addressFormUsuario.controls['idpersona'].setValue(
        this.modalService.usuario.idPersona
      );
      this.addressFormUsuario.controls['nickname'].setValue(
        this.modalService.usuario.nickname + ''
      );
      this.addressFormUsuario.controls['contraseña'].setValue(
        this.modalService.usuario.contraseña + ''
      );
    } else {
      this.addressFormUsuario.controls['idpersona'].setValue(
        null
      );
    }
  }

  async onSubmit(): Promise<void> {
    try {
      this.infoUsuario.idPersona = Number(this.addressFormUsuario.controls['idpersona'].value);
      this.infoUsuario.nickname = this.addressFormUsuario.controls['nickname'].value;
      this.infoUsuario.contraseña = this.addressFormUsuario.controls['contraseña'].value;

      console.log(this.infoUsuario);

      if (this.modalService.accion.value == "Modificar") {

        this.infoUsuarioPut.idUsuario = this.modalService.id;
        this.infoUsuarioPut.idPersona = this.infoUsuario.idPersona;
        this.infoUsuarioPut.nickname = this.infoUsuario.nickname;
        this.infoUsuarioPut.contraseña = this.infoUsuario.contraseña;

        const response = await this.api.put("Usuario", this.modalService.id + '', this.infoUsuarioPut);

        if (response) {
          const result = await Swal.fire({
            title: 'Dato modificado',
            text: 'Se modificó el campo exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          if (result.isConfirmed) {
            window.location.reload();
          }
        } else {
          Swal.fire(
            'Error al enviar los datos',
            'Ha ocurrido un error al editar el campo',
            'error'
          );
        }

      } else {

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
